import { Notification } from "@mantine/core";
import React from "react";
import { useNotificationsStore } from "../stores/notificationsStore";
import SideBar from "./SideBar";

function Layout({ children }: { children: React.ReactNode }) {
	const notificationsStore = useNotificationsStore();

	return (
		<>
			<div className="flex text-white" dir="rtl">
				<div className="print:hidden">
					<SideBar />
				</div>
				<div className="text-neutral-900 mx-6 mt-6 w-full">{children}</div>
			</div>
			<div dir="rtl" className="fixed bottom-4 right-4 flex flex-col gap-2">
				{notificationsStore.notifications.map((notification) => {
					return (
						<Notification
							onClose={() => notificationsStore.closeNotification(notification.id)}
							title={notification.title}
							color={notification.success ? "blue" : "red"}
							dir="rtl"
						>
							{notification.description}
						</Notification>
					);
				})}
			</div>
		</>
	);
}

export default Layout;
