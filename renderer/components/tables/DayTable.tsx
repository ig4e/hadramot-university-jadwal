import { Select, Table } from "@mantine/core";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import { Control, Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { CreateTableFormValues } from "../../pages/tables/create";
import { AppRouter } from "../../../electron-src/server/routers/_app";
import { isConflicting } from "../../utils/range";
import { trpc } from "../../utils/trpc";
import { DaysIndex, localizeDays } from "../teachers/TeacherForm";
import Button from "../ui/Button";
import ComboBox from "../ui/ComboBox";
import TimeRangeSlider from "../ui/TimeRangeSlider";

function DayTable({ control, day }: { control: Control<CreateTableFormValues>; day: DaysIndex }) {
	const { fields, append, remove } = useFieldArray({ control, name: day });
	return (
		<div className="grid md:[grid-template-columns:_15%_85%;] lg:[grid-template-columns:_10%_90%;] xl:[grid-template-columns:_5%_95%;] ">
			<div className={clsx("py-2 w-full flex justify-center items-center bg-slate-900 text-slate-50")}>
				<span>{localizeDays[day]}</span>
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
						{fields.map(({ id, teacherId, subjectId, timeRange }, index) => {
							return (
								<TableRow
									key={id}
									control={control}
									day={day}
									onDelete={() => {
										remove(index);
									}}
									index={index}
								></TableRow>
							);
						})}
					</tbody>
				</Table>
				{fields.length === 0 && (
					<div className="w-full text-center my-4">
						<span className="text-lg ">يوم فارغ</span>
					</div>
				)}
				<div className="mr-2.5 my-2">
					<Button
						size="md"
						className="w-full flex gap-2 items-center justify-center"
						onClick={() => append({ id: v4(), teacherId: "", subjectId: "", hallId: "", timeRange: [8, 16] })}
					>
						<PlusIcon className="h-5 w-5 stroke-1 stroke-white"></PlusIcon>
						أضف محاضرة
					</Button>
				</div>
			</div>
		</div>
	);
}

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

function TableRow({
	index,
	day,
	control,
	onDelete,
}: {
	index: number;
	day: DaysIndex;
	control: Control<CreateTableFormValues>;

	onDelete: () => void;
}) {
	const form = useFormContext<CreateTableFormValues>();
	const formValues = form.getValues();
	const majorId = useWatch({ control, name: `majorId` });
	const { teacherId, hallId, timeRange, id } = useWatch({ control, name: `${day}.${index}` }) || {};
	const rowErrors = form.formState.errors[day]?.[index];

	const hallsQuery = trpc.hall.list.useQuery({ limit: 250 });
	const teachersQuery = trpc.teacher.list.useQuery({ limit: 250 });

	const majorQuery = trpc.major.get.useQuery({ id: majorId });
	const teacherQuery = trpc.teacher.get.useQuery({ id: teacherId });

	const teacherSelectData = useMemo(() => {
		return teachersQuery.data?.items.map(({ id, name }) => ({ value: id, label: name })) || [];
	}, [teachersQuery.data]);

	const teacherSubjectsSelectData = useMemo(() => {
		return teacherQuery.data?.subjects.map(({ id, name }) => ({ value: id, label: name })) || [];
	}, [teacherQuery.data]);

	return (
		<tr>
			<td className="w-1/4">
				<Controller
					control={control}
					name={`${day}.${index}.teacherId` as any}
					render={({ field }) => (
						<ComboBox
							{...field}
							placeholder={"يرجى أختيار معلم"}
							data={teacherSelectData}
							error={rowErrors?.teacherId?.message}
						></ComboBox>
					)}
				/>
			</td>
			<td className="w-1/6">
				<Controller
					control={control}
					name={`${day}.${index}.subjectId` as any}
					render={({ field }) => (
						<Select
							{...field}
							data={teacherSubjectsSelectData}
							disabled={!teacherId}
							error={rowErrors?.subjectId?.message}
						></Select>
					)}
				/>
			</td>
			<td className="w-1/6">
				<Controller
					control={control}
					name={`${day}.${index}.hallId` as any}
					render={({ field }) => {
						return (
							<ComboBox
								{...field}
								data={
									hallsQuery.data?.items
										.filter(({ studentsCount }) => studentsCount >= (majorQuery.data?.studentsCount || 0))
										.map(({ id, name, studentsCount }) => ({
											value: id,
											label: name + ` (${studentsCount}ط)`,
										})) || []
								}
								disabled={!majorQuery.data}
								error={rowErrors?.hallId?.message}
							></ComboBox>
						);
					}}
				/>
			</td>
			<td className="w-1/2">
				<Controller
					control={control}
					name={`${day}.${index}.timeRange` as any}
					render={({ field }) => (
						<TimeRangeSlider {...field} error={rowErrors?.timeRange?.message} disabled={!teacherId}></TimeRangeSlider>
					)}
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

export default DayTable;
