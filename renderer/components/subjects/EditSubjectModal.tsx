import React, { ReactNode, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Button from "../ui/Button";
import Header from "../ui/Header";
import { Loader, Notification, TextInput } from "@mantine/core";
import { trpc } from "../../utils/trpc";
import { useNotificationsStore } from "../../stores/notificationsStore";
import Modal from "../ui/Modal";

const EditSubjectModal = ({
	subjectId,
	trigger,
	onComplete,
}: {
	subjectId: number;
	trigger: ReactNode;
	onComplete: () => void;
}) => {
	const notificationStore = useNotificationsStore();
	const [inputValue, setInputValue] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const subjectData = trpc.subject.get.useQuery({ id: subjectId });
	const editSubjectHook = trpc.subject.edit.useMutation();

	useEffect(() => {
		setSubmitDisabled(!!!inputValue.trim());
	}, [inputValue]);

	useEffect(() => {
		if (subjectData.data?.name) setInputValue(subjectData.data?.name);
	}, [subjectData.data]);

	const editSubject = async () => {
		try {
			const subject = await editSubjectHook.mutateAsync({
				id: subjectId,
				name: inputValue,
			});
			if (subject.id) {
				notificationStore.notify({
					success: true,
					title: "تم تعديل مادة بنجاح!",
					description: `تم تعديل ${subject.name} بنجاح.`,
				});
				onComplete();
			} else {
				notificationStore.notify({
					success: false,
					title: "تعذر تعجيل المادة!",
					description: "أسم المادة مكرر",
					timeToDismiss: 4000,
				});
			}
		} catch {
			notificationStore.notify({
				success: false,
				title: "تعذر تعديل المادة!",
				description: "أسم المادة مكرر",
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
						<Header size="md">تعديل مادة</Header>
					</Dialog.Title>

					<TextInput
						label="أسم المادة"
						required={true}
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						disabled={subjectData.isLoading}
						rightSection={
							subjectData.isLoading ? <Loader></Loader> : null
						}
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
								onClick={editSubject}
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

export default EditSubjectModal;
