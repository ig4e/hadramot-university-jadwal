import { yupResolver } from "@hookform/resolvers/yup";
import { Loader, Select, Table } from "@mantine/core";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { Control, Controller, FieldErrors, useFieldArray, useForm, UseFormRegister, UseFormSetError, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import PageHeader from "../../components/PageHeader";
import { days, DaysIndex, localizeDays } from "../../components/teachers/TeacherForm";
import Button from "../../components/ui/Button";
import ComboBox from "../../components/ui/ComboBox";
import TimeRangeSelect from "../../components/ui/TimeRangeSelect";
import TimeRangeSlider, { formatDuration } from "../../components/ui/TimeRangeSlider";
import { AppRouter } from "../../server/routers/_app";
import { trpc } from "../../utils/trpc";
import { tableValidationSchema } from "../../validation/tableSchema";
export type CreateTableDayValue = { id: string; teacherId: string; subjectId: string; hallId: string; timeRange: [number, number] };

export type CreateTableFormValues = {
	level: 1 | 2 | 3 | 4;
	acceptType: 1 | 2;
	semester: 1 | 2;
	majorId: string;
	SUNDAY: CreateTableDayValue[];
	MONDAY: CreateTableDayValue[];
	TUESDAY: CreateTableDayValue[];
	WEDNESDAY: CreateTableDayValue[];
	THURSDAY: CreateTableDayValue[];
	FRIDAY: CreateTableDayValue[];
	SATURDAY: CreateTableDayValue[];
};

function CreateTable() {
	const {
		control,
		setValue,
		register,
		formState: { errors },
		getValues,
		handleSubmit,
		setError,
	} = useForm<CreateTableFormValues>({
		defaultValues: {
			semester: 1,
			acceptType: 1,
			majorId: "",
			level: 1,
			SUNDAY: [{ id: v4(), teacherId: "", subjectId: "", hallId: "", timeRange: [8, 16] }],
			MONDAY: [],
			TUESDAY: [],
			WEDNESDAY: [],
			THURSDAY: [],
			FRIDAY: [],
			SATURDAY: [],
		},
		resolver: yupResolver(tableValidationSchema),
	});

	const majorId = useWatch({ control, name: "majorId" });
	const acceptType = useWatch({ control, name: "acceptType" });

	useEffect(() => {
		setValue("majorId", "");
	}, [acceptType]);

	const teachersQuery = trpc.teacher.list.useQuery({ limit: 250 });
	const hallsQuery = trpc.hall.list.useQuery({ limit: 250 });
	const majorsQuery = trpc.major.list.useQuery({ limit: 250, type: acceptType });
	const majorQuery = trpc.major.get.useQuery({ id: majorId });
	const majorsSelectData = useMemo(() => majorsQuery.data?.items.map(({ id, name }) => ({ value: id, label: name })), [majorsQuery.data]);

	const sundayFieldsArray = useFieldArray({ name: "SUNDAY", control });
	const mondayFieldsArray = useFieldArray({ name: "MONDAY", control });
	const tuesdayFieldsArray = useFieldArray({ name: "TUESDAY", control });
	const wednesdayFieldsArray = useFieldArray({ name: "WEDNESDAY", control });
	const thursdayFieldsArray = useFieldArray({ name: "THURSDAY", control });
	const fridayFieldsArray = useFieldArray({ name: "FRIDAY", control });
	const saturdayFieldsArray = useFieldArray({ name: "SATURDAY", control });

	const arrays = {
		SUNDAY: sundayFieldsArray,
		MONDAY: mondayFieldsArray,
		TUESDAY: tuesdayFieldsArray,
		WEDNESDAY: wednesdayFieldsArray,
		THURSDAY: thursdayFieldsArray,
		FRIDAY: fridayFieldsArray,
		SATURDAY: saturdayFieldsArray,
	};

	function formSubmit(data: any) {}

	return (
		<div className="space-y-4">
			<PageHeader header="أنشاء جدول جديد" description="هنا يمكنك أنشاء جدول"></PageHeader>

			<div className="flex gap-4 items-center">
				<Controller
					control={control}
					name="semester"
					render={({ field }) => (
						<Select
							label="أختر الفصل الدراسى"
							placeholder="الفصل الدراسى"
							data={[
								{ value: "1", label: "الأول" },
								{ value: "2", label: "الثانى" },
							]}
							onChange={(value) => field.onChange(Number(value) as any)}
							value={String(field.value)}
							onBlur={field.onBlur}
							ref={field.ref}
							name={field.name}
							error={errors.semester?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="acceptType"
					render={({ field }) => (
						<Select
							label="أختر نوع القبول"
							placeholder="نوع القبول"
							data={[
								{ value: "1", label: "عام" },
								{ value: "2", label: "موازى" },
							]}
							onChange={(value) => field.onChange(Number(value) as any)}
							value={String(field.value)}
							onBlur={field.onBlur}
							ref={field.ref}
							name={field.name}
							error={errors.acceptType?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="majorId"
					render={({ field }) => (
						<Select
							label="أختر التخصص"
							placeholder="التخصص"
							data={majorsSelectData || []}
							rightSection={majorsQuery.isLoading && <Loader className="w-5"></Loader>}
							disabled={majorsQuery.isLoading}
							{...field}
							error={errors.majorId?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="level"
					render={({ field }) => (
						<Select
							label="أختر المستوى"
							placeholder="المستوى"
							data={[
								{ value: "1", label: "الأول" },
								{ value: "2", label: "الثانى" },
								{ value: "3", label: "الثالث" },
								{ value: "4", label: "الرابع" },
							]}
							disabled={majorsQuery.isLoading}
							error={errors.level?.message}
							onChange={(value) => field.onChange(Number(value) as any)}
							value={String(field.value)}
							onBlur={field.onBlur}
							ref={field.ref}
							name={field.name}
						/>
					)}
				/>
			</div>

			<form onSubmit={handleSubmit(formSubmit)}>
				{days.map((day, dayIndex) => {
					return (
						<div
							key={"day" + day}
							className="grid  md:[grid-template-columns:_15%_85%;] lg:[grid-template-columns:_10%_90%;] xl:[grid-template-columns:_5%_95%;] "
						>
							<div
								className={clsx("py-2 w-full flex justify-center items-center bg-slate-900 text-slate-50", {
									"rounded-tr-md": dayIndex === 0,
									"rounded-br-md": dayIndex === 6,
								})}
							>
								<span>{localizeDays[day as DaysIndex]}</span>
							</div>
							<div>
								<Table className="bg-slate-900 rounded-l-md ">
									<thead>
										<tr>
											<th className="!text-slate-50">المعلم</th>
											<th className="!text-slate-50">المادة</th>
											<th className="!text-slate-50">القاعة</th>

											<th className="!text-slate-50">الوقت</th>
										</tr>
									</thead>
									<tbody className="bg-slate-50 border rounded-md">
										{arrays[day].fields.map(({ id, teacherId, subjectId, timeRange }, index) => {
											return (
												<TableRow
													setError={setError}
													key={id}
													teachers={teachersQuery.data?.items || []}
													control={control}
													name={`${day}.${index}`}
													register={register}
													onDelete={() => {
														arrays[day].remove(index);
													}}
													halls={hallsQuery.data?.items || []}
													errors={errors?.[day]?.[index] || {}}
													major={majorQuery.data}
												></TableRow>
											);
										})}
									</tbody>
								</Table>
								{arrays[day].fields.length === 0 && (
									<div className="w-full text-center my-4">
										<span className="text-lg ">يوم فارغ</span>
									</div>
								)}
								<div className="mr-2.5 my-2">
									<Button
										size="md"
										className="w-full flex gap-2 items-center justify-center"
										onClick={() =>
											arrays[day].append({ id: v4(), teacherId: "", subjectId: "", hallId: "", timeRange: [8, 16] })
										}
									>
										<PlusIcon className="h-5 w-5 stroke-1 stroke-white"></PlusIcon>
										أضف محاضرة
									</Button>
								</div>
							</div>
						</div>
					);
				})}

				<Button type="submit">حفظ</Button>
			</form>
		</div>
	);
}

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

function TableRow({
	control,
	register,
	setError,
	name,
	teachers,
	onDelete,
	halls,
	errors,
	major,
}: {
	control: Control<CreateTableFormValues>;
	register: UseFormRegister<CreateTableFormValues>;
	setError: UseFormSetError<CreateTableFormValues>;
	name: string;
	teachers: RouterOutput["teacher"]["list"]["items"];
	halls: RouterOutput["hall"]["list"]["items"];
	onDelete: () => void;
	errors: any;
	major?: RouterOutput["major"]["get"];
}) {
	const { teacherId, hallId } = useWatch({ control, name: name as "SUNDAY.0" }) || {};
	const teacherQuery = trpc.teacher.get.useQuery({ id: teacherId });
	const hallQuery = trpc.hall.get.useQuery({ id: hallId });

	const teacherSubjects = teacherQuery.data?.subjects || [];

	useEffect(() => {
		const { data: hall } = hallQuery;
		if (hall && major) {
			if (hall.studentsCount < major.studentsCount)
				setError(`${name}.hallId` as "SUNDAY.0.hallId", { message: "سعة القاعة لاتكفى عدد طلاب التخصص" });
		}
	}, [hallId, major]);

	return (
		<tr>
			<td className="w-1/4">
				<Controller
					control={control}
					name={`${name}.teacherId` as any}
					render={({ field }) => (
						<ComboBox
							{...field}
							placeholder={"يرجى أختيار معلم"}
							data={
								teachers.map(({ id, name }) => ({
									value: id,
									label: name,
								})) || []
							}
							error={errors.teacherId?.message}
						></ComboBox>
					)}
				/>
			</td>
			<td className="w-1/6">
				<Controller
					control={control}
					name={`${name}.subjectId` as any}
					render={({ field }) => (
						<Select
							{...field}
							data={teacherSubjects.map(({ id, name }) => ({
								value: id,
								label: name,
							}))}
							disabled={!teacherId}
							error={errors.subjectId?.message}
						></Select>
					)}
				/>
			</td>
			<td className="w-1/6">
				<Controller
					control={control}
					name={`${name}.hallId` as any}
					render={({ field }) => {
						return (
							<ComboBox
								{...field}
								data={halls
									.filter(({ studentsCount }) => studentsCount >= (major?.studentsCount || 0))
									.map(({ id, name, studentsCount }) => ({
										value: id,
										label: name + ` (${studentsCount}ط)`,
									}))}
								disabled={!major}
								error={errors.hallId?.message}
							></ComboBox>
						);
					}}
				/>
			</td>
			<td className="w-full">
				<Controller
					control={control}
					name={`${name}.timeRange` as any}
					render={({ field }) => <TimeRangeSlider {...field} error={".."} disabled={!teacherId}></TimeRangeSlider>}
				/>
			</td>
			<td className="w-1">
				<Button size="md" intent="danger" className="flex items-center gap-2" onClick={onDelete}>
					<TrashIcon></TrashIcon>
					<span>حذف</span>
				</Button>
			</td>
		</tr>
	);
}

export default CreateTable;
