import { useEffect, useMemo } from "react";
import { MultiSelect, TextInput } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { teacherValidationSchema } from "../../validation/teacherSchema";
import { trpc } from "../../utils/trpc";

import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import { v4 } from "uuid";
import TimeRangeSlider from "../ui/TimeRangeSlider";

export const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"] as const;

export type DaysIndex = "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";

export const localizeDays = {
	SUNDAY: "الأحد",
	MONDAY: "الأثنين",
	TUESDAY: "الثلثاء",
	WEDNESDAY: "الأربعاء",
	THURSDAY: "الخميس",
	FRIDAY: "الجمعة",
	SATURDAY: "السبت",
} as const;

export type TeacherFormData = {
	name: string;
	subjects: string[];
	workDates: {
		id: string;
		day: string;
		value: number[];
	}[];
};

function TeacherForm({ onSubmit, defaultData }: { onSubmit: (d: TeacherFormData) => void; defaultData?: TeacherFormData }) {
	const allSubjects = trpc.subject.list.useQuery({ limit: 250 });

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(teacherValidationSchema),
		defaultValues: {
			name: "",
			subjects: [""],
			workDates: [{ id: v4(), day: "SUNDAY", value: [8, 16] }],
		},
	});

	useEffect(() => {
		if (defaultData) {
			const { name, subjects, workDates } = defaultData;
			setValue("name", name);
			setValue("subjects", subjects);
			setValue("workDates", []);
			setValue("workDates", workDates);
		}
	}, [defaultData]);

	const {
		append,
		remove,
		fields: workDates,
	} = useFieldArray({
		name: "workDates",
		control,
		keyName: "id",
	});

	const allSubjectsMemo = useMemo(
		() =>
			allSubjects.data?.items.map(({ id, name }) => ({
				value: id,
				label: name,
			})),
		[allSubjects.data?.items],
	);

	return (
		<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex gap-4">
				<div className="grid grid-flow-row [grid-template-columns:repeat(auto-fill,minmax(250px,1fr));] gap-4 w-full">
					<div className="col-span-1 -mt-2">
						<Header size="sm">معلومات المعلم</Header>
						<TextInput {...register("name")} label={"أسم المعلم"} error={errors.name?.message}></TextInput>
					</div>

					<div className="col-span-1 -mt-2">
						<Header size="sm">مواد المعلم</Header>
						<Controller
							name="subjects"
							control={control}
							render={({ field }) => (
								<MultiSelect
									{...field}
									label={"مواد المعلم"}
									data={allSubjectsMemo || []}
									error={errors?.subjects?.[0]?.message}
								></MultiSelect>
							)}
						/>
					</div>
				</div>
			</div>

			<div className="pt-4 border-t space-y-4">
				<Header size="sm">توافر المعلم</Header>
				<Tabs defaultValue={"SUNDAY"}>
					<Tabs.List>
						{days.map((day) => {
							return (
								<Tabs.Tab key={day + "tab"} value={day}>
									{localizeDays[day]}
								</Tabs.Tab>
							);
						})}
					</Tabs.List>

					{days.map((day, index) => {
						return (
							<Tabs.Panel key={day + "tabPanel"} value={day} pt="md" className="space-y-10 mx-2">
								<div className="flex justify-between">
									<div>
										<Header size="sm">توافر المعلم يوم {localizeDays[day]}</Header>
										<P size="sm">هنا يمكنك تحديد توافر المعلم فى يوم {localizeDays[day]}</P>
									</div>

									<Button
										size="md"
										onClick={() =>
											append({
												day,
												id: v4(),
												value: [16, 20],
											})
										}
									>
										أضف وقت توفر
									</Button>
								</div>

								{workDates.map(({ id, day: workDateDay, value }, index) => {
									if (day == workDateDay)
										return (
											<div key={id} className="flex gap-2 items-center">
												<Controller
													name={`workDates.${index}.value`}
													control={control}
													render={({ field: { onChange, onBlur, value, name, ref } }) => (
														<TimeRangeSlider
															className="w-full"
															onChange={onChange}
															onBlur={onBlur}
															value={[value[0], value[1]]}
															name={name}
														></TimeRangeSlider>
													)}
												></Controller>
												<Button intent="danger" onClick={() => remove(index)} size="md">
													حذف
												</Button>
											</div>
										);
								})}
							</Tabs.Panel>
						);
					})}
				</Tabs>
			</div>

			<div className="border-t-2 border-slate-300 rounded"></div>
			<Button type="submit">حفظ</Button>
		</form>
	);
}

export default TeacherForm;
