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
		type: filters && filters.acceptType !== "0" ? Number(filters.acceptType) : undefined,
	});

	const tablesQuery = trpc.table.list.useQuery({
		limit: 250,
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
			<PageHeader header="??????????????" description="?????? ???????? ???????? ??????????????"></PageHeader>

			<div className="flex gap-4 items-center">
				<Select
					label="???????? ?????????? ??????????????"
					placeholder="?????????? ??????????????"
					data={[
						{ value: "0", label: "????????" },
						{ value: "1", label: "??????????" },
						{ value: "2", label: "????????????" },
					]}
					onChange={handleOnChange("semester")}
					defaultValue={"0"}
				/>
				<Select
					label="???????? ?????? ????????????"
					placeholder="?????? ????????????"
					data={[
						{ value: "0", label: "????????" },
						{ value: "1", label: "??????" },
						{ value: "2", label: "??????????" },
					]}
					onChange={handleOnChange("acceptType")}
					defaultValue={"0"}
				/>
				<Select
					label="???????? ????????????"
					placeholder="????????????"
					data={
						majorsSelectData
							? [
									{
										value: "0",
										label: "????????",
										group: "????????",
									},
									...majorsSelectData,
							  ]
							: []
					}
					value={filters?.majorId}
					defaultValue={"0"}
					onChange={handleOnChange("majorId")}
				/>
				<Select
					label="???????? ??????????????"
					placeholder="??????????????"
					data={[
						{ value: "0", label: "????????" },
						{ value: "1", label: "??????????" },
						{ value: "2", label: "????????????" },
						{ value: "3", label: "????????????" },
						{ value: "4", label: "????????????" },
					]}
					onChange={handleOnChange("level")}
					defaultValue={"0"}
				/>
				<Link href="/tables/create" className="self-end">
					<Button size="md" className="flex items-center gap-2 min-w-max">
						<PlusIcon className="w-5 h-5 stroke-white stroke-[0.5]"></PlusIcon>
						<span>???????? ???????? ????????</span>
					</Button>
				</Link>
			</div>

			<div>
				<Table className="bg-slate-800 rounded-md">
					<thead>
						<tr>
							<th className="!text-slate-50">????????????</th>
							<th className="!text-slate-50">?????? ????????????</th>
							<th className="!text-slate-50">?????????? ??????????????</th>
							<th className="!text-slate-50">??????????????</th>
							<th className="!text-slate-50">?????????? ??????????????</th>
							<th className="!text-slate-50">?????? ??????????</th>
							<th className="!text-slate-50">??????????????</th>
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
												className="flex items-center gap-2"
												onClick={async () => {
													try {
														await tableDeleteHook.mutateAsync({ id });
														notificationStore.notify({
															title: "???? ?????? ???????????? ??????????!",
															success: true,
														});
														tablesQuery.refetch();
													} catch {
														notificationStore.notify({
															title: "???????? ?????? ????????????!",
															success: false,
														});
													}
												}}
											>
												<TrashIcon className="h-5 w-5"></TrashIcon>
												<span>??????</span>
											</Button>
											<Link href={`/tables/preview/${id}`}>
												<Button size="sm" intent="primary" className="flex items-center gap-2">
													<ArrowsPointingOutIcon className="h-5 w-5"></ArrowsPointingOutIcon>
													<span>??????</span>
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
					<span className="bg-slate-50 w-full text-center flex justify-center">???? ???????? ??????????</span>
				)}
				{tablesQuery.isLoading && <Loader className="bg-slate-50 w-full text-center flex justify-center"></Loader>}
			</div>
		</div>
	);
}

export default Index;
