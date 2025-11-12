import instance from "./instance";
import { type Notification } from "../../typescript/types";

export const getNotificationsApi = async () => {
  return await instance.get<Notification[]>("notifications");
};
