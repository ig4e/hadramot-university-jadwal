import Image from "next/image";
import React, { ReactNode } from "react";
import { SideBarLink } from "./SideBarLink";
import Logo from "../../public/images/logo.png";
import {
	PersonIcon,
	TableIcon,
	StackIcon,
	LayersIcon,
} from "@radix-ui/react-icons";

const ROUTES: { name: string; slug: string; Icon: any }[] = [
	{
		name: "الجداول",
		slug: "/",
		Icon: TableIcon,
	},
	{
		name: "المعلمين",
		slug: "/teachers",
		Icon: PersonIcon,
	},
	{
		name: "التخصصات",
		slug: "/majors",
		Icon: StackIcon,
	},
	{
		name: "المواد",
		slug: "/subjects",
		Icon: LayersIcon,
	},
];

function SideBar() {
	return (
		<div className="bg-slate-900 h-screen min-w-[18rem] w-[25vw] max-w-[20rem] p-4 flex flex-col justify-between">
			<div className="flex flex-col gap-4 items-start">
				<div className="flex items-center gap-2">
					<Image src={Logo} width={86} height={86} alt={"جامعة حضرموت"}></Image>
					<div>
						<h1 className="text-2xl font-medium">جامعة حضرموت</h1>
						<h2 className="text-slate-300 text-lg">
							برنامج الجداول
						</h2>
					</div>
				</div>
				{ROUTES.map((route) => (
					<SideBarLink key={route.slug} {...route}></SideBarLink>
				))}
			</div>
			<span className="text-sm">
				صنع ب ❤️ من محمد ابوبكر احمد باوزير @ayak
			</span>
		</div>
	);
}

export default SideBar;