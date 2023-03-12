import clsx from "clsx";
import React from "react";

function Button({
	children,
	size = "lg",
	className,
	intent = "primary",
	...buttonArgs
}: {
	children: React.ReactNode;
	size?: "lg" | "md" | "sm";
	className?: string;
	intent?: "primary" | "secondary" | "outline" | "danger";
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
	return (
		<button
			type="button"
			{...buttonArgs}
			className={clsx(
				"rounded-md font-medium transition enabled:hover:-translate-y-0.5 enabled:active:hover:translate-y-0 disabled:opacity-50 select-none",
				{
					"text-xl font-medium py-2 px-4 rounded-lg": size === "lg",
					"text-lg py-1 px-2": size === "md",
					"text-md py-1 px-2": size === "sm",
					"bg-blue-600 enabled:hover:bg-blue-700 enabled:active:bg-blue-800 text-neutral-50 ": intent === "primary",
					"bg-red-600 enabled:hover:bg-red-700 enabled:active:bg-red-800 text-neutral-50 ": intent === "danger",
					"bg-slate-600 enabled:hover:bg-slate-700 enabled:active:bg-slate-800 text-neutral-50 ": intent === "secondary",
					"border-2 border-slate-600 enabled:hover:border-slate-700 enabled:active:border-slate-800 text-slate-600 enabled:hover:text-slate-700 enabled:active:text-slate-800":
						intent === "outline",
				},
				className,
			)}
		>
			{children}
		</button>
	);
}

export default Button;
