import { yupResolver } from "@hookform/resolvers/yup";
import { CheckIcon, NumberInput, TextInput } from "@mantine/core";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	subjectCreateFailNotification,
	subjectCreateSuccessNotification,
	subjectEditFailNotification,
	subjectEditSuccessNotification,
} from "constants/notifications/subjectNotifications";
import { useNotificationsStore } from "stores/notificationsStore";
import { trpc } from "utils/trpc";
import { subjectSchema } from "validation/subjectSchema";
import Button from "components/ui/Button";
import Header from "components/ui/Header";
import Modal from "components/ui/Modal";

function SubjectModal({ trigger, subjectId, onComplete }: { trigger: ReactNode; subjectId?: string; onComplete?: () => void }) {
	const isEdit = !!subjectId;
	const [isOpen, setIsOpen] = useState(false);
	const subjectData = isEdit ? trpc.subject.get.useQuery({ id: subjectId }) : undefined;
	const notificationStore = useNotificationsStore();
	const createSubjectHook = trpc.subject.create.useMutation();
	const editSubjectHook = trpc.subject.edit.useMutation();

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
		setValue,
		reset,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			name: "",
		},
		resolver: yupResolver(subjectSchema),
	});

	useEffect(() => {
		if (subjectData && subjectData.data) {
			setValue("name", subjectData.data.name);
		}
	}, [subjectData?.data]);

	async function onSubmit(data: { name: string }) {
		setIsOpen(false);
		reset();

		try {
			if (isEdit) {
				await editSubjectHook.mutateAsync({ id: subjectId, ...data });
				notificationStore.notify(subjectEditSuccessNotification(data.name));
			} else {
				await createSubjectHook.mutateAsync(data);
				notificationStore.notify(subjectCreateSuccessNotification(data.name));
			}
		} catch {
			if (isEdit) {
				notificationStore.notify(subjectEditFailNotification(data.name));
			} else {
				notificationStore.notify(subjectCreateFailNotification(data.name));
			}
		}

		onComplete && onComplete();
	}

	return (
		<Modal
			trigger={trigger}
			rootProps={{
				open: isOpen,
				onOpenChange(open) {
					setIsOpen(open);
				},
			}}
		>
			<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
				<Dialog.Title asChild>
					<Header size="md">{isEdit ? "عدل مادة" : "أضف مادة"}</Header>
				</Dialog.Title>

				<TextInput {...register("name")} label={"أسم المادة"} error={errors.name?.message}></TextInput>

				<div className="flex gap-2 items-center justify-end">
					<Dialog.Close asChild>
						<Button className="flex gap-2 items-center" size="md" intent="secondary" aria-label="Close">
							<Cross2Icon className="h-5 w-5" />
							<span>أغلق</span>
						</Button>
					</Dialog.Close>
					<Button type="submit" size="md" className="flex gap-2 items-center">
						<CheckIcon className="h-5 w-5" />
						<span>{isEdit ? "تعديل" : "أضف"}</span>
					</Button>
				</div>
			</form>
		</Modal>
	);
}

export default SubjectModal;
