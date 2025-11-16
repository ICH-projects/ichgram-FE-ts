import type { Socket } from "socket.io-client";
import { store } from "../../redux/store";

import { addNotification } from "../../redux/notifications/notifications-slice";
import { addMessage } from "../../redux/chat/chat-slice";

export const addNotificationsListener = (socket: Socket) => {
  socket.on("newNotification", (message) => {
    console.log("newNotification: ", message);
    store.dispatch(addNotification(message));
  });
};

export const addMessagesListener = (socket: Socket) => {
  socket.on("newMessage", (message) => {
    console.log("newMessage: ", message);
    store.dispatch(addMessage(message));
  });
};
