import { ChevronLeftIcon } from "@radix-ui/react-icons";
import PageHeader from "../../../components/PageHeader";
import { trpc } from "../../../utils/trpc";
import { useNotificationsStore } from "../../../stores/notificationsStore";
import { useRouter } from "next/router";
import TeacherForm, { DaysIndex, TeacherFormData } from "../../../components/teachers/TeacherForm";
import { teacherCreateFailNotification, teacherCreateSuccessNotification } from "../../../constants/notifications/teacherNotifications";
const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
function CreateTeachertPage() {
	const router = useRouter();
	const notifications = useNotificationsStore();
	const createTeacherHook = trpc.teacher.create.useMutation();

	async function onSubmit(data: TeacherFormData) {
		try {
			const teacher = await createTeacherHook.mutateAsync({
				name: data.name,
				subjects: data.subjects,
				workDates: data.workDates.map(({ id, day, value }) => {
					return {
						dayName: day as DaysIndex,
						endsAt: value[1],
						startsAt: value[0],
					};
				}),
			});

			notifications.notify(teacherCreateSuccessNotification(teacher.name));

			router.push("/teachers");
		} catch {
			notifications.notify(teacherCreateFailNotification(data.name));
		}
	}

	return (
		<div className="space-y-8">
			<PageHeader
				header="أنشاء معلم"
				description="هنا يمكنك أنشاء معلم وتحديد وقت توفرة وأيام عملة"
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

			<TeacherForm onSubmit={onSubmit}></TeacherForm>
		</div>
	);
}

export default CreateTeachertPage;
