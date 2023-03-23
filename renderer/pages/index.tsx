import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import P from "../components/ui/P";
import { Autocomplete, ChevronIcon, Loader, Select, Table } from "@mantine/core";
import ComboBox from "../components/ui/ComboBox";
import PageHeader from "../components/PageHeader";
import { trpc } from "../utils/trpc";
import { acceptTypeEnum, AcceptTypeEnumIndex } from "../constants/enums/acceptTypeEnum";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { semesterEnum, SemesterEnumIndex } from "../constants/enums/semesterEnum";
import { levelEnum, LevelEnumIndex } from "../constants/enums/levelEnum";

import { ArrowsPointingOutIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { useNotificationsStore } from "../stores/notificationsStore";

function Index() {
	const notificationStore = useNotificationsStore();
	const tableDeleteHook = trpc.table.delete.useMutation();
	const [filters, setFilters] = useState<{
		semester: string;
		acceptType: string;
		majorId: string;
		level: string;
	}>();

	const majorsQuery = trpc.major.list.useQuery({
		limit: 250,
		type: filters?.acceptType ? Number(filters?.acceptType) : undefined,
	});

	const tablesQuery = trpc.table.list.useQuery({
		limit: 250,
		level: filters?.level ? Number(filters.level) : undefined,
		semester: filters?.semester ? Number(filters.semester) : undefined,
		type: filters?.acceptType ? Number(filters.acceptType) : undefined,
		majorId: filters?.majorId,
	});

	useEffect(() => {
		console.log(filters);
	}, [filters]);

	const majorsSelectData = useMemo(
		() =>
			majorsQuery.data &&
			majorsQuery.data.items.map(({ id, name, type }) => ({
				value: id,
				label: name + " " + acceptTypeEnum[type as unknown as AcceptTypeEnumIndex],
				group: acceptTypeEnum[type as unknown as AcceptTypeEnumIndex],
			})),
		[majorsQuery.data],
	);

	function handleOnChange(name: string) {
		return function onChange(value: string) {
			return setFilters((state) => ({ ...state!, [name]: value }));
		};
	}

	return (
		<div className="space-y-4">
			<PageHeader header="الجداول" description="هنا يوجد جميع الجداول"></PageHeader>

			<div className="flex gap-4 items-center">
				<Select
					label="أختر الفصل الدراسى"
					placeholder="الفصل الدراسى"
					data={[
						{ value: "", label: "الكل" },
						{ value: "1", label: "الأول" },
						{ value: "2", label: "الثانى" },
					]}
					onChange={handleOnChange("semester")}
					defaultValue={""}
				/>
				<Select
					label="أختر نوع القبول"
					placeholder="نوع القبول"
					data={[
						{ value: "", label: "الكل" },
						{ value: "1", label: "عام" },
						{ value: "2", label: "موازى" },
					]}
					onChange={handleOnChange("acceptType")}
					defaultValue={""}
				/>
				<Select
					label="أختر التخصص"
					placeholder="التخصص"
					data={
						majorsSelectData
							? [
									{
										value: "",
										label: "الكل",
										group: "الكل",
									},
									...majorsSelectData,
							  ]
							: []
					}
					value={filters?.majorId}
					defaultValue={""}
					onChange={handleOnChange("majorId")}
				/>
				<Select
					label="أختر المستوى"
					placeholder="المستوى"
					data={[
						{ value: "", label: "الكل" },
						{ value: "1", label: "الأول" },
						{ value: "2", label: "الثانى" },
						{ value: "3", label: "الثالث" },
						{ value: "4", label: "الرابع" },
					]}
					onChange={handleOnChange("level")}
					defaultValue={""}
				/>
				<Link href="/tables/create" className="self-end">
					<Button size="md" className="flex items-center gap-2 min-w-max" icon="plus">
						<span>أنشئ جدول جديد</span>
					</Button>
				</Link>
			</div>

			<div>
				<Table className="bg-slate-800 rounded-md">
					<thead>
						<tr>
							<th className="!text-slate-50">التخصص</th>
							<th className="!text-slate-50">نوع القبول</th>
							<th className="!text-slate-50">الفصل الدراسى</th>
							<th className="!text-slate-50">المستوى</th>
							<th className="!text-slate-50">تاريخ الانشاء</th>
							<th className="!text-slate-50">أخر تعديل</th>
							<th className="!text-slate-50">اجرائات</th>
						</tr>
					</thead>
					{(tablesQuery.data?.items?.length || 0) > 0 && (
						<tbody className="bg-slate-50 w-full border-b border-slate-300">
							{tablesQuery.data?.items.map(({ id, level, major, semester, subjects, type, createdAt, updatedAt }) => (
								<tr key={id}>
									<td>{major?.name}</td>
									<td>{acceptTypeEnum[type as unknown as AcceptTypeEnumIndex]}</td>
									<td>{semesterEnum[semester as unknown as SemesterEnumIndex]}</td>
									<td>{levelEnum[level as unknown as LevelEnumIndex]}</td>

									<td>
										<time dateTime={createdAt?.toISOString()}>{createdAt?.toLocaleString()}</time>
									</td>
									<td>
										<time dateTime={updatedAt?.toISOString()}>{createdAt?.toLocaleString()}</time>
									</td>
									<td className="w-28">
										<div className="flex items-center gap-2 w-fit">
											<Button
												size="sm"
												intent="danger"
												icon="delete"
												onClick={async () => {
													try {
														await tableDeleteHook.mutateAsync({ id });
														notificationStore.notify({
															title: "تم حذف الجدول بنجاح!",
															success: true,
														});
														tablesQuery.refetch();
													} catch {
														notificationStore.notify({
															title: "تعذر حذف الجدول!",
															success: false,
														});
													}
												}}
											>
												<span>حذف</span>
											</Button>
											<Link href={`/tables/preview/${id}`}>
												<Button size="sm" intent="primary" icon="preview">
													<ArrowsPointingOutIcon className="h-5 w-5"></ArrowsPointingOutIcon>
													<span>عرض</span>
												</Button>
											</Link>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</Table>
				{(tablesQuery.data?.items?.length || 0) <= 0 && !tablesQuery.isLoading && (
					<span className="bg-slate-50 w-full text-center flex justify-center mt-8">لا يوجد جداول</span>
				)}
				{tablesQuery.isLoading && <Loader className="bg-slate-50 w-full text-center flex justify-center"></Loader>}
			</div>
		</div>
	);
}

export default Index;
