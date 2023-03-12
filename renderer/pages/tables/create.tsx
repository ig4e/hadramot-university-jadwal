import { yupResolver } from "@hookform/resolvers/yup";
import { Loader, Select, Table } from "@mantine/core";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import {
	Control,
	Controller,
	FieldErrors,
	FormProvider,
	useFieldArray,
	useForm,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetError,
	UseFormSetValue,
	useWatch,
} from "react-hook-form";
import { v4 } from "uuid";
import PageHeader from "../../components/PageHeader";
import DayTable from "../../components/tables/DayTable";
import { days, DaysIndex, localizeDays } from "../../components/teachers/TeacherForm";
import Button from "../../components/ui/Button";
import ComboBox from "../../components/ui/ComboBox";
import TimeRangeSelect from "../../components/ui/TimeRangeSelect";
import TimeRangeSlider from "../../components/ui/TimeRangeSlider";
import { AppRouter } from "../../../electron-src/server/routers/_app";
import { useNotificationsStore } from "../../stores/notificationsStore";
import { isIn, isConflicting } from "../../utils/range";
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
	const notifications = useNotificationsStore();

	const form = useForm<CreateTableFormValues>({
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

	const {
		clearErrors,
		control,
		formState: { errors },
		getFieldState,
		getValues,
		handleSubmit,
		register,
		reset,
		resetField,
		setError,
		setFocus,
		setValue,
		trigger,
		unregister,
		watch,
	} = form;

	const acceptType = useWatch({ control, name: "acceptType" });

	useEffect(() => {
		setValue("majorId", "");
	}, [acceptType]);

	const createTableHook = trpc.table.create.useMutation();

	const majorsQuery = trpc.major.list.useQuery({ limit: 250, type: acceptType });
	const majorsSelectData = useMemo(() => majorsQuery.data?.items.map(({ id, name }) => ({ value: id, label: name })), [majorsQuery.data]);
	const formValues = useWatch({ control });
	const validateTableHook = trpc.table.validate.useQuery({ ...(formValues as CreateTableFormValues) }, { cacheTime: 0 });
	const router = useRouter();

	useEffect(() => {
		if (validateTableHook.data) {
			console.log(validateTableHook.data);
			Object.keys(validateTableHook.data.errors).map((key) => setError(key as any, { message: validateTableHook.data.errors[key] }));
		}
	}, [validateTableHook.data]);

	async function formSubmit(data: CreateTableFormValues) {
		try {
			const result = await createTableHook.mutateAsync({ ...data });
			if (result.error) {
				Object.keys(result.errors).map((key) => setError(key as any, { message: result.errors[key] }));
				return notifications.notify({
					success: false,
					title: "هناك مشكلة بالمدخلات",
					description: `${Object.values(result.errors).join("<br/>")}`,
				});
			}

			notifications.notify({
				success: true,
				title: "تم انشاء الجدول بنجاح",
			});

			router.push("/");
		} catch {
			notifications.notify({
				success: true,
				title: "تعذر انشاء الجدول!",
				description: "تعذر انشاء الجدول يرجى المحاولة مرة اخرى",
			});
		}
	}

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

			<FormProvider {...form}>
				<form onSubmit={handleSubmit(formSubmit)} className="space-y-8">
					<div>
						{days.map((day) => {
							return <DayTable key={day} control={control} day={day}></DayTable>;
						})}
					</div>

					<Button type="submit">حفظ</Button>
				</form>
			</FormProvider>
		</div>
	);
}

export default CreateTable;
