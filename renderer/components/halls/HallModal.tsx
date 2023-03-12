import { yupResolver } from "@hookform/resolvers/yup";
import { CheckIcon, NumberInput, TextInput } from "@mantine/core";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	hallCreateFailNotification,
	hallCreateSuccessNotification,
	hallEditFailNotification,
	hallEditSuccessNotification,
} from "../../constants/notifications/hallNotifications";
import { useNotificationsStore } from "../../stores/notificationsStore";
import { trpc } from "../../utils/trpc";
import { hallSchema } from "../../validation/hallSchema";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Modal from "../ui/Modal";

function HallModal({ trigger, hallId, onComplete }: { trigger: ReactNode; hallId?: string; onComplete?: () => void }) {
	const isEdit = !!hallId;
	const [isOpen, setIsOpen] = useState(false);
	const hallData = isEdit ? trpc.hall.get.useQuery({ id: hallId }) : undefined;
	const notificationStore = useNotificationsStore();
	const createHallHook = trpc.hall.create.useMutation();
	const editHallHook = trpc.hall.edit.useMutation();

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		mode: "onChange",
		defaultValues: {
			name: "",
			studentsCount: 0,
		},
		resolver: yupResolver(hallSchema),
	});

	useEffect(() => {
		if (hallData && hallData.data) {
			setValue("name", hallData.data.name);
			setValue("studentsCount", hallData.data.studentsCount);
		}
	}, [hallData?.data]);

	async function onSubmit(data: { name: string; studentsCount: number }) {
		setIsOpen(false);
		reset();

		try {
			if (isEdit) {
				await editHallHook.mutateAsync({ id: hallId, ...data });
				notificationStore.notify(hallEditSuccessNotification(data.name));
			} else {
				await createHallHook.mutateAsync(data);
				notificationStore.notify(hallCreateSuccessNotification(data.name));
			}
		} catch {
			if (isEdit) {
				notificationStore.notify(hallEditFailNotification(data.name));
			} else {
				notificationStore.notify(hallCreateFailNotification(data.name));
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
					<Header size="md">{isEdit ? "عدل قاعة" : "أضف القاعة"}</Header>
				</Dialog.Title>

				<TextInput {...register("name")} label={"أسم القاعة"} error={errors.name?.message}></TextInput>

				<Controller
					name="studentsCount"
					control={control}
					render={({ field }) => (
						<NumberInput
							{...field}
							label="سعة القاعة من الطلاب"
							error={errors.studentsCount?.message}
							type="number"
						></NumberInput>
					)}
				></Controller>

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

export default HallModal;
