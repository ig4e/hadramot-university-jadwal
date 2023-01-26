import React, { ReactNode, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Button from "../ui/Button";
import Header from "../ui/Header";
import { Notification, TextInput } from "@mantine/core";
import { trpc } from "../../utils/trpc";
import { useNotificationsStore } from "../../stores/notificationsStore";
import Modal from "../ui/Modal";

const AddMajorModal = ({
	trigger,
	onComplete,
}: {
	trigger: ReactNode;
	onComplete: () => void;
}) => {
	const notificationStore = useNotificationsStore();
	const [inputValue, setInputValue] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const createMajorHook = trpc.major.create.useMutation();

	useEffect(() => {
		setSubmitDisabled(!(inputValue.trim().length > 0));
	}, [inputValue]);

	const createMajor = async () => {
		try {
			const major = await createMajorHook.mutateAsync({
				name: inputValue,
			});
			if (major.id) {
				notificationStore.notify({
					success: true,
					title: "تم أضافة تخصص بنجاح!",
					description: `تم أضافة ${major.name} بنجاح.`,
				});
				onComplete();
			} else {
				notificationStore.notify({
					success: false,
					title: "تعذر اضافة التخصص!",
					description: "أسم التخصص مكرر",
					timeToDismiss: 4000,
				});
			}
		} catch {
			notificationStore.notify({
				success: false,
				title: "تعذر اضافة التخصص!",
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
						<Header size="md">أضف تخصص</Header>
					</Dialog.Title>

					<TextInput
						label="أسم التخصص"
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
								onClick={createMajor}
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

export default AddMajorModal;
