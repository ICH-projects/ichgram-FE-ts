import instance from "./instance";
import { type Notification } from "../../typescript/types";

export const getNotificationsApi = async () => {
  return await instance.get<Notification[]>("notifications");
};

export const markNotificationAsReadApi = async (id: number) => {
  return await instance.put<number>(`notifications/${id}/mark`);
};

export const markAllNotificationAsReadApi = async (ids: number[]) => {
  return await instance.put<number>(`notifications/all/mark`, { ids });
};
