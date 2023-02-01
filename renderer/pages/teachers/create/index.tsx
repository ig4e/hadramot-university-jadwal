import { ChevronLeftIcon } from "@radix-ui/react-icons";
import PageHeader from "../../../components/PageHeader";
import { trpc } from "../../../utils/trpc";
import { useNotificationsStore } from "../../../stores/notificationsStore";
import { useRouter } from "next/router";
import TeacherForm, { DaysIndex, OnSubmitData } from "../../../components/teachers/TeacherForm";
const days = [
	"SUNDAY",
	"MONDAY",
	"TUESDAY",
	"WEDNESDAY",
	"THURSDAY",
	"FRIDAY",
	"SATURDAY",
];
function CreateTeachertPage() {
	const router = useRouter();
	const notifications = useNotificationsStore();
	const createTeacherHook = trpc.teacher.create.useMutation();

	async function onSubmit(data: OnSubmitData) {
		try {
			const teacher = await createTeacherHook.mutateAsync({
				name: data.name,
				subjects: data.subjects,
				workDays: days.map((d) => {
					const day = d as DaysIndex;
					return {
						day,
						dates: data.workDates[day].map(
							({ value: [startsAt, endsAt] }) => ({
								startsAt,
								endsAt,
							}),
						),
					};
				}),
			});

			notifications.notify({
				success: true,
				title: "تم أضافة معلم بنجاح!",
				description: `تم أضافة ${teacher.name} بنجاح.`,
			});

			router.push("/teachers");
		} catch {
			notifications.notify({
				success: true,
				title: "تعذر أضافة معلم!",
				description: `تعذرت أضافة ${data.name}.`,
			});
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
