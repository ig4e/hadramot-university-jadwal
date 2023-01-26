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
	intent?: "primary" | "secondary" | "outline";
} & React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) {
	return (
		<button
			{...buttonArgs}
			className={clsx(
				"rounded-md font-medium transition hover:-translate-y-0.5 active:hover:translate-y-0",
				{
					"text-xl font-medium py-2 px-4 rounded-lg": size === "lg",
					"text-lg py-1 px-2": size === "md",
					"text-md py-1 px-2": size === "sm",
					"bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-neutral-50 ":
						intent === "primary",
					"bg-slate-600 hover:bg-slate-700 active:bg-slate-800 text-neutral-50 ":
						intent === "secondary",
					"border-2 border-slate-600 hover:border-slate-700 active:border-slate-800 text-slate-600 hover:text-slate-700 active:text-slate-800":
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
