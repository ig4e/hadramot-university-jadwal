import { Table } from "@mantine/core";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import P from "../components/ui/P";
import { trpc } from "../utils/trpc";

function Majors() {
	const majors = trpc.major.list.useQuery({ limit: 250 });

	return (
		<div className="space-y-8">
			<div className="flex items-start justify-between">
				<div className="space-y-2">
					<Header>التخصصات</Header>
					<P size="lg">هنا يوجد جميع التخصصات</P>
				</div>
				<Button
					size="lg"
					className="flex items-center gap-2 min-w-max self-end"
				>
					<PlusIcon className="w-5 h-5 stroke-white stroke-[0.5]"></PlusIcon>
					<span>أنشئ تخصص جديد</span>
				</Button>
			</div>

			<Table className="bg-slate-800 rounded-md">
				<thead>
					<tr>
						<th className="!text-neutral-50">المسلسل</th>
						<th className="!text-neutral-50">أسم التخصص</th>
						<th className="!text-neutral-50">تاريخ الانشاء</th>
						<th className="!text-neutral-50">أخر تعديل</th>
						<th className="!text-neutral-50">اجرائات</th>
					</tr>
				</thead>
				<tbody className="bg-neutral-50 w-full border-b border-slate-300">
					{majors.data?.items.map(
						({ id, name, createdAt, updatedAt }) => (
							<tr key={id}>
								<td>{id}</td>
								<td>{name}</td>
								<td>
									<time dateTime={createdAt}></time>
								</td>
								<td>{updatedAt}</td>
								<td>اعدادات</td>
							</tr>
						),
					)}
				</tbody>
			</Table>
		</div>
	);
}

export default Majors;
