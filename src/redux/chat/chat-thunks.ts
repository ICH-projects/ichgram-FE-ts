import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import type { Chat, Message } from "../../typescript/types";

import {
  createChatApi,
  createMessageApi,
  getChatsApi,
  getMessagesByChatIdApi,
} from "../../shared/api/chat-api";

export const getChats = createAsyncThunk(
  "chats/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getChatsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const createChat = createAsyncThunk(
  "chats/create",
  async (payload: Chat, { rejectWithValue }) => {
    try {
      const { data } = await createChatApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const getMessagesByChatId = createAsyncThunk(
  "chats/get_messages",
  async (chatId: number, { rejectWithValue }) => {
    try {
      const { data } = await getMessagesByChatIdApi(chatId);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const createMessage = createAsyncThunk(
  "chats/create_message",
  async (message: Message, { rejectWithValue }) => {
    try {
      const { data } = await createMessageApi(message);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);
