import { Loader, Table } from "@mantine/core";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import P from "../components/ui/P";
import { trpc } from "../utils/trpc";
import AddMajorModal from "../components/majors/AddMajorModal";
import EditMajorModal from "../components/majors/EditMajorModal";
import { useNotificationsStore } from "../stores/notificationsStore";
import PageHeader from "../components/PageHeader";

function Majors() {
	const majors = trpc.major.list.useQuery({ limit: 250 });
	const majorDeleteHook = trpc.major.delete.useMutation();
	const notificationStore = useNotificationsStore();

	return (
		<div className="space-y-8">
			<PageHeader
				header="التخصصات"
				description="هنا يوجد جميع التخصصات"
				leftSection={{
					children: (
						<AddMajorModal
							onComplete={() => majors.refetch()}
							trigger={
								<Button
									size="lg"
									className="flex items-center gap-2 min-w-max self-end"
								>
									<PlusIcon className="w-5 h-5 stroke-white stroke-[0.5]"></PlusIcon>
									<span>أنشئ تخصص جديد</span>
								</Button>
							}
						></AddMajorModal>
					),
				}}
			></PageHeader>

			<Table className="bg-slate-800 rounded-md">
				<thead>
					<tr>
						<th className="!text-slate-50">أسم التخصص</th>
						<th className="!text-slate-50">تاريخ الانشاء</th>
						<th className="!text-slate-50">أخر تعديل</th>
						<th className="!text-slate-50">اجرائات</th>
					</tr>
				</thead>
				{(majors.data?.items?.length || 0) > 0 && (
					<tbody className="bg-slate-50 w-full border-b border-slate-300">
						{majors.data?.items.map(
							({ id, name, createdAt, updatedAt }) => (
								<tr key={id}>
									<td>{name}</td>
									<td>
										<time
											dateTime={createdAt.toISOString()}
										>
											{createdAt.toLocaleString()}
										</time>
									</td>
									<td>
										<time
											dateTime={updatedAt.toISOString()}
										>
											{createdAt.toLocaleString()}
										</time>
									</td>
									<td className="w-28">
										<div className="flex items-center gap-2 w-fit">
											<Button
												size="sm"
												intent="danger"
												className="flex items-center gap-2"
												onClick={async () => {
													try {
														await majorDeleteHook.mutateAsync(
															{ id },
														);
														notificationStore.notify(
															{
																title: "تم حذف التخصص بنجاح!",
																description: `تم حذف ${name} بنجاح.`,
																success: true,
															},
														);
														majors.refetch();
													} catch {
														notificationStore.notify(
															{
																title: "تعذر حذف التخصص!",
																description: `تعذر حذف ${name}.`,
																success: false,
															},
														);
													}
												}}
											>
												<TrashIcon></TrashIcon>
												<span>حذف</span>
											</Button>
											<EditMajorModal
												onComplete={() =>
													majors.refetch()
												}
												majorId={id}
												trigger={
													<Button
														size="sm"
														className="flex items-center gap-2"
													>
														<Pencil1Icon></Pencil1Icon>
														<span>تعديل</span>
													</Button>
												}
											></EditMajorModal>
										</div>
									</td>
								</tr>
							),
						)}
					</tbody>
				)}
			</Table>
			{(majors.data?.items?.length || 0) <= 0 && !majors.isLoading && (
				<span className="bg-slate-50 w-full text-center flex justify-center">
					لا يوجد تخصصات
				</span>
			)}
			{majors.isLoading && (
				<Loader className="bg-slate-50 w-full text-center flex justify-center"></Loader>
			)}
		</div>
	);
}

export default Majors;
