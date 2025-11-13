import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  getNotificationsApi,
  markAllNotificationAsReadApi,
  markNotificationAsReadApi,
} from "../../shared/api/notification-api";

export const getNotifications = createAsyncThunk(
  "notifications/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getNotificationsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (payload: number, { rejectWithValue }) => {
    try {
      const { data } = await markNotificationAsReadApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (payload: number[], { rejectWithValue }) => {
    try {
      const { data } = await markAllNotificationAsReadApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);
