import type { Chat, Message } from "../../typescript/types";
import instance from "./instance";

export const createChatApi = (payload: Chat) => {
  return instance.post<Chat>("chats", { ...payload });
};

export const getChatsApi = () => {
  return instance.get<Chat[]>("chats");
};

export const createMessageApi = (payload: Message) => {
  return instance.post<Message>("messages", { ...payload });
};

export const getMessagesByChatIdApi = (chatId: number) => {
  return instance.get<Message[]>(`messages/${chatId}`);
};
