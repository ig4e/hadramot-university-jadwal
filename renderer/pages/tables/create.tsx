import { Loader, Select, Table } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { v4 } from "uuid";
import PageHeader from "../../components/PageHeader";
import { days, DaysIndex, localizeDays } from "../../components/teachers/TeacherForm";
import Button from "../../components/ui/Button";
import ComboBox from "../../components/ui/ComboBox";
import TimeRangeSelect from "../../components/ui/TimeRangeSelect";
import TimeRangeSlider, { formatDuration } from "../../components/ui/TimeRangeSlider";
import { trpc } from "../../utils/trpc";

function CreateTable() {
	const [acceptType, setAcceptType] = useState(0);
	const [majorId, setMajorId] = useState("");

	useEffect(() => {
		setMajorId("");
	}, [acceptType]);

	const teachersQuery = trpc.teacher.list.useQuery({ limit: 250 });
	const subjectsQuery = trpc.subject.list.useQuery({ limit: 250 });
	const hallsQuery = trpc.hall.list.useQuery({ limit: 250 });
	const majorsQuery = trpc.major.list.useQuery({ limit: 250, type: acceptType });
	const majorsSelectData = useMemo(() => majorsQuery.data?.items.map(({ id, name }) => ({ value: id, label: name })), [majorsQuery.data]);

	return (
		<div className="space-y-4">
			<PageHeader header="أنشاء جدول جديد" description="هنا يمكنك أنشاء جدول"></PageHeader>

			<div className="flex gap-4 items-center">
				<Select
					label="أختر الفصل الدراسى"
					placeholder="الفصل الدراسى"
					data={[
						{ value: "1", label: "الأول" },
						{ value: "2", label: "الثانى" },
					]}
					defaultValue={"0"}
				/>
				<Select
					label="أختر نوع القبول"
					placeholder="نوع القبول"
					data={[
						{ value: "1", label: "عام" },
						{ value: "2", label: "موازى" },
					]}
					defaultValue={"0"}
					onChange={(value) => {
						setAcceptType(Number(value));
					}}
				/>
				<Select
					label="أختر التخصص"
					placeholder="التخصص"
					data={majorsSelectData || []}
					defaultValue={"0"}
					rightSection={majorsQuery.isLoading && <Loader className="w-5"></Loader>}
					disabled={majorsQuery.isLoading || acceptType === 0}
					value={majorId}
					onChange={(value) => setMajorId(value!)}
				/>
			</div>

			<div></div>
		</div>
	);
}

export default CreateTable;
