import React, { ReactNode, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Button from "../ui/Button";
import Header from "../ui/Header";
import { Notification, TextInput } from "@mantine/core";
import { trpc } from "../../utils/trpc";
import { useNotificationsStore } from "../../stores/notificationsStore";
import Modal from "../ui/Modal";

const AddTeacherModal = ({
	trigger,
	onComplete,
}: {
	trigger: ReactNode;
	onComplete: () => void;
}) => {
	const notificationStore = useNotificationsStore();
	const [inputValue, setInputValue] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const createTeacherHook = trpc.teacher.create.useMutation();

	useEffect(() => {
		setSubmitDisabled(!!!inputValue.trim());
	}, [inputValue]);

	const createTeacher = async () => {
		try {
			const teacher = { id: 1, name: "محمد" }; //await createTeacherHook.mutateAsync({});

			if (teacher.id) {
				notificationStore.notify({
					success: true,
					title: "تم أضافة معلم بنجاح!",
					description: `تم أضافة ${teacher.name} بنجاح.`,
				});
				onComplete();
			} else {
				notificationStore.notify({
					success: false,
					title: "تعذر اضافة المعلم!",
					description: "أسم المعلم مكرر",
					timeToDismiss: 4000,
				});
			}
		} catch {
			notificationStore.notify({
				success: false,
				title: "تعذر اضافة المعلم!",
				description: "أسم المعلم مكرر",
				timeToDismiss: 4000,
			});
		}
	};

	return (
		<>
			<Modal trigger={trigger}>
				<form
					className="bg-slate-50 min-w-[20rem] w-full max-w-xl p-4 rounded-md space-y-4"
					onSubmit={(e) => e.preventDefault()}
				>
					<Dialog.Title asChild>
						<Header size="md">أضف معلم</Header>
					</Dialog.Title>

					<TextInput
						label="أسم المعلم"
						required={true}
						onChange={(e) => setInputValue(e.target.value)}
					></TextInput>

					<div className="flex gap-2 items-center justify-end">
						<Dialog.Close asChild>
							<Button
								className="flex gap-2 items-center"
								size="md"
								intent="secondary"
								aria-label="Close"
							>
								<Cross2Icon className="h-5 w-5" />
								<span>أغلق</span>
							</Button>
						</Dialog.Close>
						<Dialog.Close asChild>
							<Button
								onClick={createTeacher}
								disabled={submitDisabled}
								type="submit"
								size="md"
								className="flex gap-2 items-center"
							>
								<CheckIcon className="h-5 w-5" />
								<span>أضف</span>
							</Button>
						</Dialog.Close>
					</div>
				</form>
			</Modal>
		</>
	);
};

export default AddTeacherModal;
