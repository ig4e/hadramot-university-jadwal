import { ChevronLeftIcon } from "@radix-ui/react-icons";
import PageHeader from "components/PageHeader";
import { trpc } from "utils/trpc";
import { useNotificationsStore } from "stores/notificationsStore";
import { useRouter } from "next/router";
import TeacherForm, { DaysIndex, TeacherFormData } from "components/teachers/TeacherForm";
import { teacherEditFailNotification, teacherEditSuccessNotification } from "constants/notifications/teacherNotifications";
import { useMemo } from "react";

function EditTeachertPage() {
	const router = useRouter();
	const notifications = useNotificationsStore();
	const editTeacherHook = trpc.teacher.edit.useMutation();
	const teacherQuery = trpc.teacher.get.useQuery({
		id: router.query.id as string,
	});

	const convertedTeacherData = useMemo(() => {
		if (!teacherQuery.data) return;
		const { id, name, subjects, workDates } = teacherQuery.data;
		return {
			name,
			subjects: subjects.map((subject) => subject.id),
			workDates: workDates.map(({ day, startsAt, endsAt, id }) => {
				return {
					id,
					day: day.name,
					value: [startsAt, endsAt],
				};
			}),
		} as TeacherFormData;
	}, [teacherQuery.data]);

	async function onSubmit(data: TeacherFormData) {
		console.log(data);
		try {
			const teacher = await editTeacherHook.mutateAsync({
				id: router.query.id as string,
				name: data.name,
				subjects: data.subjects,
				workDates: data.workDates.map(({ id, day, value }) => {
					return {
						id,
						dayName: day as DaysIndex,
						endsAt: value[1],
						startsAt: value[0],
					};
				}),
			});

			notifications.notify(teacherEditSuccessNotification(teacher.name));

			router.push("/teachers");
		} catch {
			notifications.notify(teacherEditFailNotification(data.name));
		}
	}

	return (
		<div className="space-y-8">
			<PageHeader
				header="تعديل معلم"
				description="هنا يمكنك تعديل معلم وتحديد وقت توفرة وأيام عملة"
				link={{
					href: "/teachers",
					buttonChildren: (
						<>
							<ChevronLeftIcon className="w-5 h-5 stroke-white stroke-[0.5]"></ChevronLeftIcon>
							<span>رجوع</span>
						</>
					),
				}}
			></PageHeader>

			<TeacherForm onSubmit={onSubmit} defaultData={convertedTeacherData}></TeacherForm>
		</div>
	);
}

export default EditTeachertPage;
