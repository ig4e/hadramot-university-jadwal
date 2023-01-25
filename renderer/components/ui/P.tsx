import clsx from "clsx";
import React from "react";

function P({
	children,
	size = "lg",
	className,
}: {
	children: React.ReactNode;
	size?: "lg" | "md" | "sm";
	className?: string;
}) {
	return (
		<div
			className={clsx(
				"",
				{
					"text-lg": size === "lg",
					"text-md": size === "md",
					"text-sm": size === "sm",
				},
				className,
			)}
		>
			{children}
		</div>
	);
}

export default P;
