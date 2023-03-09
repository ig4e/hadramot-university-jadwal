import clsx from "clsx";
import React from "react";

function Header({ children, size = "lg", className }: { children: React.ReactNode; size?: "lg" | "md" | "sm"; className?: string }) {
	return (
		<div
			className={clsx(
				"font-semibold",
				{
					"text-2xl md:text-3xl lg:text-4xl font-semibold": size === "lg",
					"text-lg md:text-xl lg:text-2xl font-semibold": size === "md",
					"text-base md:text-lg lg:text-xl font-semibold": size === "sm",
				},
				className,
			)}
		>
			{children}
		</div>
	);
}

export default Header;
