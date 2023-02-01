import React, { ReactNode, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Button from "../ui/Button";
import Header from "../ui/Header";
import { Loader, Notification, TextInput } from "@mantine/core";
import { trpc } from "../../utils/trpc";
import { useNotificationsStore } from "../../stores/notificationsStore";
import Modal from "../ui/Modal";

const EditMajorModal = ({
	majorId,
	trigger,
	onComplete,
}: {
	majorId: string;
	trigger: ReactNode;
	onComplete: () => void;
}) => {
	const notificationStore = useNotificationsStore();
	const [inputValue, setInputValue] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const majorData = trpc.major.get.useQuery({ id: majorId });
	const editMajorHook = trpc.major.edit.useMutation();

	useEffect(() => {
		setSubmitDisabled(!(inputValue.trim().length > 0));
	}, [inputValue]);

	useEffect(() => {
		if (majorData.data?.name) setInputValue(majorData.data?.name);
	}, [majorData.data]);

	const editMajor = async () => {
		try {
			const major = await editMajorHook.mutateAsync({
				id: majorId,
				name: inputValue,
			});
			if (major.id) {
				notificationStore.notify({
					success: true,
					title: "تم تعديل تخصص بنجاح!",
					description: `تم تعديل ${major.name} بنجاح.`,
				});
				onComplete();
			} else {
				notificationStore.notify({
					success: false,
					title: "تعذر تعجيل التخصص!",
					description: "أسم التخصص مكرر",
					timeToDismiss: 4000,
				});
			}
		} catch {
			notificationStore.notify({
				success: false,
				title: "تعذر تعديل التخصص!",
				description: "أسم التخصص مكرر",
				timeToDismiss: 4000,
			});
		}
	};

	return (
		<>
			<Modal
				trigger={trigger}
				rootProps={{
					onOpenChange: (open) => {
						if (open === false) {
							setSubmitDisabled(true);
							setInputValue("");
						}
					},
				}}
			>
				<form
					className="bg-slate-50 min-w-[20rem] w-full max-w-xl p-4 rounded-md space-y-4"
					onSubmit={(e) => e.preventDefault()}
				>
					<Dialog.Title asChild>
						<Header size="md">تعديل تخصص</Header>
					</Dialog.Title>

					<TextInput
						label="أسم التخصص"
						required={true}
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						disabled={majorData.isLoading}
						rightSection={
							majorData.isLoading ? <Loader></Loader> : null
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
								onClick={editMajor}
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

export default EditMajorModal;
