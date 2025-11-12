import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { getNotificationsApi } from "../../shared/api/notification-api";

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
