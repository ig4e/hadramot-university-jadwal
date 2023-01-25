import React from "react";
import SideBar from "./SideBar";

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex text-white" dir="rtl">
            <SideBar />
			<div>{children}</div>
		</div>
	);
}

export default Layout;
