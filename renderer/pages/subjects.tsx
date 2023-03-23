import { Loader, Table } from "@mantine/core";
import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Button from "components/ui/Button";
import Header from "components/ui/Header";
import P from "components/ui/P";
import { trpc } from "utils/trpc";

import { useNotificationsStore } from "stores/notificationsStore";
import PageHeader from "components/PageHeader";
import SubjectModal from "components/subjects/SubjectModal";

function Subject() {
	const subject = trpc.subject.list.useQuery({ limit: 250 });
	const subjectDeleteHook = trpc.subject.delete.useMutation();
	const notificationStore = useNotificationsStore();

	return (
		<div className="space-y-8">
			<PageHeader
				header="المواد"
				description="هنا يوجد جميع المواد"
				leftSection={{
					children: (
						<SubjectModal
							onComplete={() => subject.refetch()}
							trigger={
								<Button size="lg" className="flex items-center gap-2 min-w-max self-end" icon="plus">
									<span>أنشئ مادة جديد</span>
								</Button>
							}
						></SubjectModal>
					),
				}}
			></PageHeader>

			<Table className="bg-slate-800 rounded-md">
				<thead>
					<tr>
						<th className="!text-slate-50">أسم المادة</th>
						<th className="!text-slate-50">اجرائات</th>
					</tr>
				</thead>
				{(subject.data?.items?.length || 0) > 0 && (
					<tbody className="bg-slate-50 w-full border-b border-slate-300">
						{subject.data?.items.map(({ id, name, createdAt, updatedAt }) => (
							<tr key={id}>
								<td>{name}</td>

								<td className="w-28">
									<div className="flex items-center gap-2 w-fit">
										<Button
											size="sm"
											intent="danger"
											icon="delete"
											onClick={async () => {
												try {
													await subjectDeleteHook.mutateAsync({ id });
													notificationStore.notify({
														title: "تم حذف المادة بنجاح!",
														description: `تم حذف ${name} بنجاح.`,
														success: true,
													});
													subject.refetch();
												} catch {
													notificationStore.notify({
														title: "تعذر حذف المادة!",
														description: `تعذر حذف ${name}.`,
														success: false,
													});
												}
											}}
										>
											<span>حذف</span>
										</Button>
										<SubjectModal
											onComplete={() => subject.refetch()}
											subjectId={id}
											trigger={
												<Button size="sm" icon="edit">
													<span>تعديل</span>
												</Button>
											}
										></SubjectModal>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</Table>
			{(subject.data?.items?.length || 0) <= 0 && !subject.isLoading && (
				<span className="bg-slate-50 w-full text-center flex justify-center">لا يوجد مواد</span>
			)}
			{subject.isLoading && <Loader className="bg-slate-50 w-full text-center flex justify-center"></Loader>}
		</div>
	);
}

export default Subject;
