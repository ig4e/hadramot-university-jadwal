import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import P from "../components/ui/P";
import { Autocomplete, ChevronIcon, Loader, Select } from "@mantine/core";
import ComboBox from "../components/ui/ComboBox";
import PageHeader from "../components/PageHeader";
import { trpc } from "../utils/trpc";
import { majorTypes, majorTypesIndex } from "../constants/enums/majorType";
import { useForm } from "react-hook-form";
import Link from "next/link";

function Index() {
	const [filters, setFilters] = useState<{
		semester: string;
		acceptType: string;
		majorId: string;
	}>();

	const majorsQuery = trpc.major.list.useQuery({
		limit: 250,
		type: filters && filters.acceptType !== "0" ? Number(filters.acceptType) : undefined,
	});

	useEffect(() => {
		console.log(filters);
	}, [filters]);

	const majorsSelectData = useMemo(
		() =>
			majorsQuery.data &&
			majorsQuery.data.items.map(({ id, name, type }) => ({
				value: id,
				label: name + " " + majorTypes[type as unknown as majorTypesIndex],
				group: majorTypes[type as unknown as majorTypesIndex],
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
						{ value: "0", label: "الكل" },
						{ value: "1", label: "الأول" },
						{ value: "2", label: "الثانى" },
					]}
					onChange={handleOnChange("semester")}
					defaultValue={"0"}
				/>
				<Select
					label="أختر نوع القبول"
					placeholder="نوع القبول"
					data={[
						{ value: "0", label: "الكل" },
						{ value: "1", label: "عام" },
						{ value: "2", label: "موازى" },
					]}
					onChange={handleOnChange("acceptType")}
					defaultValue={"0"}
				/>
				<Select
					label="أختر التخصص"
					placeholder="التخصص"
					data={
						majorsSelectData
							? [
									{
										value: "0",
										label: "الكل",
										group: "الكل",
									},
									...majorsSelectData,
							  ]
							: []
					}
					value={filters?.majorId}
					defaultValue={"0"}
					onChange={handleOnChange("majorId")}
				/>
				<Link href="/tables/create" className="self-end">
					<Button size="md" className="flex items-center gap-2 min-w-max">
						<PlusIcon className="w-5 h-5 stroke-white stroke-[0.5]"></PlusIcon>
						<span>أنشئ جدول جديد</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Index;
