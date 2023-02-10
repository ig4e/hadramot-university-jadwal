import { Badge, Loader, Table, useMantineTheme } from "@mantine/core";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import P from "../../components/ui/P";
import { trpc } from "../../utils/trpc";
import { useNotificationsStore } from "../../stores/notificationsStore";
import Link from "next/link";
import PageHeader from "../../components/PageHeader";

function Teacher() {
	const teacher = trpc.teacher.list.useQuery({ limit: 250 });
	const teacherDeleteHook = trpc.teacher.delete.useMutation();
	const notificationStore = useNotificationsStore();
	const theme = useMantineTheme();

	return (
		<div className="space-y-8">
			<PageHeader
				header="المعلمين"
				description="هنا يوجد جميع المعلمين"
				link={{
					href: "/teachers/create",
					buttonChildren: (
						<>
							<PlusIcon className="w-5 h-5 stroke-white stroke-[0.5]"></PlusIcon>
							<span>أنشئ معلم جديد</span>
						</>
					),
				}}
			></PageHeader>

			<Table className="bg-slate-800 rounded-md">
				<thead>
					<tr>
						<th className="!text-slate-50">أسم المعلم</th>
						<th className="!text-slate-50">مواد المعلم</th>
						<th className="!text-slate-50">اجرائات</th>
					</tr>
				</thead>
				{(teacher.data?.items?.length || 0) > 0 && (
					<tbody className="bg-slate-50 w-full border-b border-slate-300">
						{teacher.data?.items.map(({ id, name, createdAt, updatedAt, subjects }) => (
							<tr key={id}>
								<td>{name}</td>
								<td className="flex flex-wrap gap-1">
									{subjects.map((x) => (
										<Badge variant="outline" color={"gray"}>
											{x.name}
										</Badge>
									))}
								</td>

								<td className="w-20">
									<div className="flex items-center gap-2 w-fit">
										<Link href={"/teachers/edit/" + id}>
											<Button size="sm" className="flex items-center gap-2">
												<Pencil1Icon></Pencil1Icon>
												<span>تعديل</span>
											</Button>
										</Link>

										<Button
											size="sm"
											intent="danger"
											className="flex items-center gap-2"
											onClick={async () => {
												try {
													await teacherDeleteHook.mutateAsync({ id });
													notificationStore.notify({
														title: "تم حذف المعلم بنجاح!",
														description: `تم حذف ${name} بنجاح.`,
														success: true,
													});
													teacher.refetch();
												} catch {
													notificationStore.notify({
														title: "تعذر حذف المعلم!",
														description: `تعذر حذف ${name}.`,
														success: false,
													});
												}
											}}
										>
											<TrashIcon></TrashIcon>
											<span>حذف</span>
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</Table>
			{(teacher.data?.items?.length || 0) <= 0 && !teacher.isLoading && (
				<span className="bg-slate-50 w-full text-center flex justify-center">لا يوجد معلمون</span>
			)}
			{teacher.isLoading && <Loader className="bg-slate-50 w-full text-center flex justify-center"></Loader>}
		</div>
	);
}

export default Teacher;
