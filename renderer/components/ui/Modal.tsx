import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

function Modal({
	rootProps,
	trigger,
	children,
}: {
	rootProps?: Dialog.DialogProps;
	trigger: ReactNode;
	children: ReactNode;
}) {
	return (
		<Dialog.Root {...rootProps}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-slate-900/25 grid place-items-center">
					<Dialog.Content
						dir="rtl"
						className="bg-slate-50 min-w-[20rem] w-full max-w-xl p-4 rounded-md space-y-4"
					>
						{children}
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default Modal;
