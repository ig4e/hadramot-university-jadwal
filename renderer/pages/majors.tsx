import { Loader, Table } from "@mantine/core";
import Button from "components/ui/Button";
import { trpc } from "utils/trpc";
import { useNotificationsStore } from "stores/notificationsStore";
import PageHeader from "components/PageHeader";
import MajorModal from "components/majors/MajorModal";
import { acceptTypeEnum, AcceptTypeEnumIndex } from "constants/enums/acceptTypeEnum";

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
						<MajorModal
							onComplete={() => majors.refetch()}
							trigger={
								<Button size="lg" className="min-w-max self-end" icon="plus">
									<span>أنشئ تخصص جديد</span>
								</Button>
							}
						></MajorModal>
					),
				}}
			></PageHeader>

			<Table className="bg-slate-800 rounded-md">
				<thead>
					<tr>
						<th className="!text-slate-50">أسم التخصص</th>
						<th className="!text-slate-50">عدد طلاب التخصص</th>
						<th className="!text-slate-50">نوع قبول التخصص</th>
						<th className="!text-slate-50">اجرائات</th>
					</tr>
				</thead>
				{(majors.data?.items?.length || 0) > 0 && (
					<tbody className="bg-slate-50 w-full border-b border-slate-300">
						{majors.data?.items.map(({ id, name, type, studentsCount }) => (
							<tr key={id}>
								<td>{name}</td>
								<td>{studentsCount}</td>
								<td>{acceptTypeEnum[type as unknown as AcceptTypeEnumIndex]}</td>

								<td className="w-28">
									<div className="flex items-center gap-2 w-fit">
										<Button
											size="sm"
											intent="danger"
											icon="delete"
											onClick={async () => {
												try {
													await majorDeleteHook.mutateAsync({ id });
													notificationStore.notify({
														title: "تم حذف التخصص بنجاح!",
														description: `تم حذف ${name} بنجاح.`,
														success: true,
													});
													majors.refetch();
												} catch {
													notificationStore.notify({
														title: "تعذر حذف التخصص!",
														description: `تعذر حذف ${name}.`,
														success: false,
													});
												}
											}}
										>
											<span>حذف</span>
										</Button>

										<MajorModal
											onComplete={() => {
												majors.refetch();
											}}
											majorId={id}
											trigger={
												<Button size="sm" icon="edit">
													<span>تعديل</span>
												</Button>
											}
										></MajorModal>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</Table>
			{(majors.data?.items?.length || 0) <= 0 && !majors.isLoading && (
				<span className="bg-slate-50 w-full text-center flex justify-center">لا يوجد تخصصات</span>
			)}
			{majors.isLoading && <Loader className="bg-slate-50 w-full text-center flex justify-center"></Loader>}
		</div>
	);
}

export default Majors;
