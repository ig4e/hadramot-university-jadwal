import Image from "next/image";
import React, { ReactNode } from "react";
import { SideBarLink } from "./SideBarLink";
import Logo from "../../public/images/logo.png";
import {
	PersonIcon,
	TableIcon,
	StackIcon,
	LayersIcon,
	HomeIcon,
	SquareIcon,
	BoxIcon,
	ArchiveIcon,
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
		Icon: LayersIcon,
	},
	{
		name: "المواد",
		slug: "/subjects",
		Icon: ArchiveIcon,
	},
	{
		name: "القاعات",
		slug: "/halls",
		Icon: BoxIcon,
	},
];

function SideBar() {
	return (
		<div className="bg-slate-900 min-h-screen min-w-[18rem] w-[25vw] max-w-[20rem] ">
			<div className="flex flex-col justify-between h-[calc(100vh-1rem)] sticky top-0 p-4">
				<div className="flex flex-col gap-4 items-start">
					<div className="flex items-center gap-2">
						<Image
							src={Logo}
							width={86}
							height={86}
							alt={"جامعة حضرموت"}
						></Image>
						<div>
							<h1 className="text-2xl font-medium">
								جامعة حضرموت
							</h1>
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
		</div>
	);
}

export default SideBar;
