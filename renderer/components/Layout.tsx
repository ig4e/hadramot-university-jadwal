import { ArrowPathIcon, ArrowUturnDownIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Notification } from "@mantine/core";
import React from "react";
import { useNotificationsStore } from "../stores/notificationsStore";
import SideBar from "./SideBar";
import Button from "./ui/Button";

function Layout({ children }: { children: React.ReactNode }) {
	const notificationsStore = useNotificationsStore();

	return (
		<>
			<div className="flex text-white relative" dir="rtl">
				<div className="print:hidden">
					<SideBar />
				</div>
				<div className="text-neutral-900 mx-6 mt-6 print:my-0 w-full">{children}</div>

				<Button className="absolute left-2 bottom-2 z-50 rounded-full !p-2" onClick={() => location.reload()}>
					<ArrowPathIcon className="h-6 w-6"></ArrowPathIcon>
				</Button>
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
							{notification.description && <span dangerouslySetInnerHTML={{ __html: notification.description }}></span>}
						</Notification>
					);
				})}
			</div>
		</>
	);
}

export default Layout;
