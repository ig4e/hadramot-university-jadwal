import { Loader, Table } from "@mantine/core";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import P from "../components/ui/P";
import { trpc } from "../utils/trpc";
import { useNotificationsStore } from "../stores/notificationsStore";
import PageHeader from "../components/PageHeader";
import MajorModal from "../components/majors/MajorModal";
import { acceptTypeEnum, AcceptTypeEnumIndex } from "../constants/enums/acceptTypeEnum";

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
								<Button size="lg" className="flex items-center gap-2 min-w-max self-end">
									<PlusIcon className="w-5 h-5 stroke-white stroke-[0.5]"></PlusIcon>
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
											className="flex items-center gap-2"
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
											<TrashIcon className="h-5 w-5"></TrashIcon>
											<span>حذف</span>
										</Button>

										<MajorModal
											onComplete={() => {
												majors.refetch();
											}}
											majorId={id}
											trigger={
												<Button size="sm" className="flex items-center gap-2">
													<Pencil1Icon className="h-5 w-5"></Pencil1Icon>
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
