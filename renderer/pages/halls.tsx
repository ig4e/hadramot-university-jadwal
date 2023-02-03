import { Loader, Table } from "@mantine/core";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import P from "../components/ui/P";
import { trpc } from "../utils/trpc";
import { useNotificationsStore } from "../stores/notificationsStore";
import PageHeader from "../components/PageHeader";
import HallModal from "../components/halls/HallModal";

function Halls() {
	const halls = trpc.hall.list.useQuery({ limit: 250 });
	const hallDeleteHook = trpc.hall.delete.useMutation();
	const notificationStore = useNotificationsStore();

	return (
		<div className="space-y-8">
			<PageHeader
				header="القاعات"
				description="هنا يوجد جميع القاعات"
				leftSection={{
					children: (
						<HallModal
							onComplete={() => halls.refetch()}
							trigger={
								<Button
									size="lg"
									className="flex items-center gap-2 min-w-max self-end"
								>
									<PlusIcon className="w-5 h-5 stroke-white stroke-[0.5]"></PlusIcon>
									<span>أنشئ قاعة جديد</span>
								</Button>
							}
						></HallModal>
					),
				}}
			></PageHeader>

			<Table className="bg-slate-800 rounded-md">
				<thead>
					<tr>
						<th className="!text-slate-50">أسم القاعة</th>
						<th className="!text-slate-50">سعة القاعة</th>
						<th className="!text-slate-50">تاريخ الانشاء</th>
						<th className="!text-slate-50">أخر تعديل</th>
						<th className="!text-slate-50">اجرائات</th>
					</tr>
				</thead>
				{(halls.data?.items?.length || 0) > 0 && (
					<tbody className="bg-slate-50 w-full border-b border-slate-300">
						{halls.data?.items.map(
							({
								id,
								name,
								studentsCount,
								createdAt,
								updatedAt,
							}) => (
								<tr key={id}>
									<td>{name}</td>
									<td>{studentsCount}</td>
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
														await hallDeleteHook.mutateAsync(
															{ id },
														);
														notificationStore.notify(
															{
																title: "تم حذف القاعة بنجاح!",
																description: `تم حذف ${name} بنجاح.`,
																success: true,
															},
														);
														halls.refetch();
													} catch {
														notificationStore.notify(
															{
																title: "تعذر حذف القاعة!",
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

											<HallModal
												onComplete={() => {
													halls.refetch()
												}}
												hallId={id}
												trigger={
													<Button
														size="sm"
														className="flex items-center gap-2"
													>
														<Pencil1Icon></Pencil1Icon>
														<span>تعديل</span>
													</Button>
												}
											></HallModal>
										</div>
									</td>
								</tr>
							),
						)}
					</tbody>
				)}
			</Table>
			{(halls.data?.items?.length || 0) <= 0 && !halls.isLoading && (
				<span className="bg-slate-50 w-full text-center flex justify-center">
					لا يوجد قاعات
				</span>
			)}
			{halls.isLoading && (
				<Loader className="bg-slate-50 w-full text-center flex justify-center"></Loader>
			)}
		</div>
	);
}

export default Halls;
