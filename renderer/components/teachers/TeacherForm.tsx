import { useMemo } from "react";
import { MultiSelect, TextInput } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { createTeacherValidationSchema } from "../../validation/createTeacherSchema";
import { trpc } from "../../utils/trpc";

import Header from "../ui/Header";
import P from "../ui/P";
import Button from "../ui/Button";
import CreateTeacherDate from "./CreateTeacherDate";

const days = [
	"SUNDAY",
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
];

export type DaysIndex =
	| "SUNDAY"
	| "MONDAY"
	| "TUESDAY"
	| "WEDNESDAY"
	| "THURSDAY"
	| "FRIDAY"
	| "SATURDAY";

export const localizeDays = {
	SUNDAY: "الأحد",
	MONDAY: "الأثنين",
	TUESDAY: "الثلثاء",
	WEDNESDAY: "الأربعاء",
	THURSDAY: "الخميس",
	FRIDAY: "الجمعة",
	SATURDAY: "السبت",
};

export type OnSubmitData = {
	name: string;
	subjects: string[];
	workDates: {
		SUNDAY: {
			value: number[];
		}[];
		MONDAY: {
			value: number[];
		}[];
		TUESDAY: {
			value: number[];
		}[];
		WEDNESDAY: {
			value: number[];
		}[];
		THURSDAY: {
			value: number[];
		}[];
		FRIDAY: {
			value: number[];
		}[];
		SATURDAY: {
			value: number[];
		}[];
	};
};

function TeacherForm({
	onSubmit,
	defaultData,
}: {
	onSubmit: (d: OnSubmitData) => void;
	defaultData?: OnSubmitData;
}) {
	const allSubjects = trpc.subject.list.useQuery({ limit: 250 });

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: defaultData || {
			name: "",
			subjects: [""],
			workDates: {
				SUNDAY: [{ value: [8, 16] }],
				MONDAY: [{ value: [8, 16] }],
				TUESDAY: [{ value: [8, 16] }],
				WEDNESDAY: [{ value: [8, 16] }],
				THURSDAY: [{ value: [8, 16] }],
				FRIDAY: [{ value: [8, 16] }],
				SATURDAY: [{ value: [8, 16] }],
			},
		},

		resolver: yupResolver(createTeacherValidationSchema),
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
						<TextInput
							{...register("name")}
							label={"أسم المعلم"}
							error={errors.name?.message}
						></TextInput>
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
									{localizeDays[day as DaysIndex]}
								</Tabs.Tab>
							);
						})}
					</Tabs.List>

					{days.map((day, index) => {
						return (
							<Tabs.Panel
								key={day + "tabPanel"}
								value={day}
								pt="md"
								className="space-y-10 mx-2"
							>
								<div>
									<Header size="sm">
										توافر المعلم يوم{" "}
										{localizeDays[day as DaysIndex]}
									</Header>
									<P size="sm">
										هنا يمكنك تحديد توافر المعلم فى يوم{" "}
										{localizeDays[day as DaysIndex]}
									</P>
								</div>

								<CreateTeacherDate
									control={control}
									fieldKey={day}
								></CreateTeacherDate>
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
