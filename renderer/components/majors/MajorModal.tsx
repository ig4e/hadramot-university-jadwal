import { yupResolver } from "@hookform/resolvers/yup";
import {
	CheckIcon,
	NumberInput,
	Select,
	TextInput,
} from "@mantine/core";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import{ ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	majorCreateFailNotification,
	majorCreateSuccessNotification,
	majorEditFailNotification,
	majorEditSuccessNotification,
} from "constants/notifications/majorNotifications";
import { useNotificationsStore } from "stores/notificationsStore";
import { trpc } from "utils/trpc";
import { majorSchema } from "validation/majorSchema";
import Button from "components/ui/Button";
import Header from "components/ui/Header";
import Modal from "components/ui/Modal";

function MajorModal({
	trigger,
	majorId,
	onComplete,
}: {
	trigger: ReactNode;
	majorId?: string;
	onComplete?: () => void;
}) {
	const isEdit = !!majorId;
	const [isOpen, setIsOpen] = useState(false);
	const majorData = isEdit
		? trpc.major.get.useQuery({ id: majorId })
		: undefined;
	const notificationStore = useNotificationsStore();
	const createMajorHook = trpc.major.create.useMutation();
	const editMajorHook = trpc.major.edit.useMutation();

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
			studentsCount: 0,
			type: "1",
		},
		resolver: yupResolver(majorSchema),
	});

	useEffect(() => {
		if (majorData && majorData.data) {
			setValue("name", majorData.data.name);
			setValue("studentsCount", majorData.data.studentsCount);
			setValue("type", String(majorData.data.type));
		}
	}, [majorData?.data]);

	async function onSubmit(data: {
		name: string;
		studentsCount: number;
		type: string;
	}) {
		setIsOpen(false);
		reset();

		try {
			if (isEdit) {
				await editMajorHook.mutateAsync({
					id: majorId,
					name: data.name,
					studentsCount: data.studentsCount,
					type: Number(data.type),
				});
				notificationStore.notify(
					majorEditSuccessNotification(data.name),
				);
			} else {
				await createMajorHook.mutateAsync({
					name: data.name,
					studentsCount: data.studentsCount,
					type: Number(data.type),
				});
				notificationStore.notify(
					majorCreateSuccessNotification(data.name),
				);
			}
		} catch {
			if (isEdit) {
				notificationStore.notify(majorEditFailNotification(data.name));
			} else {
				notificationStore.notify(
					majorCreateFailNotification(data.name),
				);
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
					<Header size="md">
						{isEdit ? "عدل تخصص" : "أضف التخصص"}
					</Header>
				</Dialog.Title>

				<TextInput
					{...register("name")}
					label={"أسم التخصص"}
					error={errors.name?.message}
				></TextInput>

				<div className="flex items-start gap-2">
					<Controller
						name="studentsCount"
						control={control}
						render={({ field }) => (
							<NumberInput
								{...field}
								label="عدد طلاب التخصص"
								error={errors.studentsCount?.message}
								type="number"
								className="w-full"
							></NumberInput>
						)}
					></Controller>

					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								label="نوع قبول التخصص"
								data={[
									{ value: "1", label: "عام" },
									{ value: "2", label: "موازى" },
								]}
								className=""
								error={errors.type?.message}
							></Select>
						)}
					></Controller>
				</div>

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
					<Button
						type="submit"
						size="md"
						className="flex gap-2 items-center"
					>
						<CheckIcon className="h-5 w-5" />
						<span>{isEdit ? "تعديل" : "أضف"}</span>
					</Button>
				</div>
			</form>
		</Modal>
	);
}

export default MajorModal;
