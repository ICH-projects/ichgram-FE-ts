import type { Socket } from "socket.io-client";
import { addNotification } from "../../redux/notifications/notifications-slice";
import { store } from "../../redux/store";

export const addNotificationsListener = (socket: Socket) => {
  socket.on("newNotification", (message) => {
    console.log("newNotification: ", message);
    store.dispatch(addNotification(message))
  });
};
