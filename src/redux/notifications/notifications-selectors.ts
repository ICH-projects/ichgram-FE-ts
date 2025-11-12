import type { NotificationsStore, Store } from "../../typescript/types";

export const selectNotificationsStore = (store: Store): NotificationsStore =>
  store.notifications;

export const selectNotificationCount = (store: Store): number =>
  store.notifications.notifications.length;
