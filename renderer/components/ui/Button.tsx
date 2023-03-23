import { XMarkIcon } from "@heroicons/react/24/outline";
import { FileTextIcon, OpenInNewWindowIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React from "react";

const icons = {
	plus: PlusIcon,
	save: FileTextIcon,
	delete: XMarkIcon,
	preview: OpenInNewWindowIcon,
	edit: Pencil1Icon,
};

function Button({
	children,
	size = "lg",
	className,
	intent = "primary",
	icon,
	...buttonArgs
}: {
	children: React.ReactNode;
	size?: "lg" | "md" | "sm";
	className?: string;
	intent?: "primary" | "secondary" | "outline" | "danger";
	icon?: "plus" | "save" | "delete" | "preview" | "edit";
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
	const Icon = icon && icons[icon];
	return (
		<button
			type="button"
			{...buttonArgs}
			className={clsx(
				"rounded-md font-medium transition enabled:hover:-translate-y-0.5 enabled:active:hover:translate-y-0 disabled:opacity-50 select-none  shadow-xl",
				{
					"text-xl font-medium py-2 px-4 rounded-lg": size === "lg",
					"text-lg py-1 px-3": size === "md",
					"text-md py-1 px-3": size === "sm",
					"bg-blue-600 enabled:hover:bg-blue-700 enabled:active:bg-blue-800 text-neutral-50 shadow-blue-600/10":
						intent === "primary",
					"bg-red-600 enabled:hover:bg-red-700 enabled:active:bg-red-800 text-neutral-50 shadow-red-600/10": intent === "danger",
					"bg-slate-600 enabled:hover:bg-slate-700 enabled:active:bg-slate-800 text-neutral-50 shadow-slate-600/10":
						intent === "secondary",
					"border-2 border-slate-600 enabled:hover:border-slate-700 enabled:active:border-slate-800 text-slate-600 enabled:hover:text-slate-700 enabled:active:text-slate-800 shadow-slate-600/10":
						intent === "outline",

					"flex gap-2 items-center": Icon,
				},
				className,
			)}
		>
			{Icon && <Icon className={clsx("h-5 w-5", { "h-4 w-4": size === "sm" })}></Icon>}
			{children}
		</button>
	);
}

export default Button;
