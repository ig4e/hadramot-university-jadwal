import React, { ReactNode, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Button from "../ui/Button";
import Header from "../ui/Header";
import { Notification, TextInput } from "@mantine/core";
import { trpc } from "../../utils/trpc";

const AddMajorModal = ({
	trigger,
	onComplete,
}: {
	trigger: ReactNode;
	onComplete: () => void;
}) => {
	const [inputValue, setInputValue] = useState("");
	const [submitDisabled, setSubmitDisabled] = useState(true);
	const [notificationState, setNotificationState] = useState<{
		open: boolean;
		success: boolean;
	}>({ open: false, success: false });

	const createMajorHook = trpc.major.create.useMutation();

	useEffect(() => {
		setSubmitDisabled(!!!inputValue.trim());
	}, [inputValue]);

	useEffect(() => {
		let timeout: any;
		if (notificationState.open) {
			timeout = setTimeout(
				() =>
					setNotificationState({
						open: false,
						success: notificationState.success,
					}),
				3000,
			);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [notificationState]);

	const createMajor = async () => {
		try {
			const major = await createMajorHook.mutateAsync({
				name: inputValue,
			});
			if (major.id) {
				setNotificationState({ open: true, success: true });
                onComplete()
			} else {
				setNotificationState({ open: true, success: false });
			}
		} catch {
			setNotificationState({ open: true, success: false });
		}
	};

	return (
		<>
			{notificationState.open && (
				<Notification
					onClose={() =>
						setNotificationState({
							open: false,
							success: notificationState.success,
						})
					}
					title={
						notificationState.success
							? "تم أضافة تخصص بنجاح"
							: "حدث خطاء! تعذر اضافة تخصص (أسم التخصص مكرر)"
					}
					color={notificationState.success ? "blue" : "red"}
				></Notification>
			)}
			<Dialog.Root
				onOpenChange={(open) => {
					if (open === false) {
						setSubmitDisabled(true);
						setInputValue("");
					}
				}}
			>
				<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 bg-slate-900/25 grid place-items-center">
						<Dialog.Content dir="rtl" asChild>
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
									onChange={(e) =>
										setInputValue(e.target.value)
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
						</Dialog.Content>
					</Dialog.Overlay>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
};

export default AddMajorModal;
