import { createSlice } from "@reduxjs/toolkit";

import type { ChatsStore } from "../../typescript/types";

import { createChat, createMessage, getChats } from "./chat-thunks";

import { pending, rejected } from "../../shared/utils/redux";
import { mergeArraysDistinct } from "../../shared/utils/arrays";

const initialState: ChatsStore = {
  loading: false,
  error: null,
  message: null,
  chats: [],
  activeChat: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, pending)
      .addCase(getChats.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.chats = payload;
        store.message = "Request successfully processed";
      })
      .addCase(getChats.rejected, (store, { payload }) => {
        rejected(store, { payload });
      })

      .addCase(createChat.pending, pending)
      .addCase(createChat.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.chats = mergeArraysDistinct(store.chats, [payload]);
        store.message = "Request successfully processed";
      })
      .addCase(createChat.rejected, (store, { payload }) => {
        rejected(store, { payload });
      })

      .addCase(createMessage.pending, pending)
      .addCase(createMessage.fulfilled, (store) => {
        store.loading = false;
        store.message = "Message successfully sended";
      })
      .addCase(createMessage.rejected, (store, { payload }) => {
        rejected(store, { payload });
      });
  },
  reducers: {
    addMessage: (store, { payload }) => {
      const chat = store.chats.find((c) => c.id === payload.chatId);
      if (!chat) return;
      if (!chat.messages) return;
      chat?.messages.push(payload);
      store.activeChat?.messages.push(payload);
    },
    setActiveChat: (store, { payload }) => {
      store.activeChat = payload;
    },
  },
});

export const { addMessage, setActiveChat } = chatsSlice.actions;

export default chatsSlice.reducer;
