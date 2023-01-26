import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface NotificationInput {
	title: string;
    success: boolean
	description?: string;
	timeToDismiss?: number;
}

interface Notification extends NotificationInput {
	id: string;
	timeToDismiss: number;
    open: boolean;
}

interface NotificationsState {
	notifications: Notification[];
}

interface NotificationActions {
	notify: (notification: NotificationInput) => void;
	closeNotification: (notificationId: Notification["id"]) => void;
}

const useNotificationsStore = create<
	NotificationsState & NotificationActions
>()(
	immer((set, get) => ({
		notifications: [],
		notify: (notification) => {
			const closeNotification = get().closeNotification;
			const newNotification: Notification = {
				...notification,
				id: crypto.randomUUID(),
				timeToDismiss: 3000,
                open: true,
			};

			set((state) => {
				state.notifications.push(newNotification);
			});

			setTimeout(() => {
				closeNotification(newNotification.id);
			}, newNotification.timeToDismiss);
		},
		closeNotification: (id) => {
			set((state) => {
				state.notifications = state.notifications.filter(
					(notification: Notification) => notification.id !== id,
				);
			});
		},
	})),
);

export { useNotificationsStore };
