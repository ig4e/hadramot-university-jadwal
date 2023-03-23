import Link from "next/link";
import React, { ReactNode } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import Button from "components/ui/Button";

function SideBarLink({ name, slug, Icon }: { name: string; slug: string; Icon: typeof PersonIcon }) {
	const router = useRouter();

	return (
		<Link
			href={slug}
			// className={clsx(
			// 	"bg-slate-800 border-slate-600 rounded-md hover:bg-slate-700 active:bg-slate-800 transition w-full p-2 border flex items-center gap-2 select-none",
			// 	{
			// 		"bg-blue-600 hover:bg-blue-700 active:bg-blue-800 !border-blue-500": router.pathname === slug,
			// 	},
			// )}
			className="w-full"
		>
			<Button
				intent={router.pathname === slug ? "primary" : "secondary"}
				className={clsx("w-full flex items-center gap-2 select-none border", {
					"bg-slate-800 border-slate-600 rounded-md hover:bg-slate-700 active:bg-slate-800": router.pathname !== slug,
				})}
			>
				<Icon className="h-5 w-5"></Icon>
				<span>{name}</span>
			</Button>
		</Link>
	);
}

export { SideBarLink };
