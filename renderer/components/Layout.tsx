import React from "react";
import SideBar from "./SideBar";

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex text-white" dir="rtl">
            <SideBar />
			<div className="text-neutral-900 mx-6 mt-6 w-full">{children}</div>
		</div>
	);
}

export default Layout;
