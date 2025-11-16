import { createSelector } from "@reduxjs/toolkit";

import type { Chat, Store, StoreAsync } from "../../typescript/types";

const selectAllChats = (store: Store): Chat[] => store.chats.chats;

export const selectChatsServiceData = (store: Store): StoreAsync => store.chats;

export const selectChats = (store: Store): Chat[] => store.chats.chats;
export const selectActiveChat = (store: Store): Chat | null =>
  store.chats.activeChat;

export const selectChatByMember2Id = (member2Id: number | undefined) =>
  createSelector(selectAllChats, (chats) => {
    return member2Id
      ? [...chats].find((c) => c.member2Id === member2Id)
      : undefined;
  });
