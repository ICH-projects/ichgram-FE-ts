import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import type { Follow } from "../../typescript/types";

import { getUserByIdApi } from "../../shared/api/user-api";
import { followUserApi } from "../../shared/api/follow-api";

export const getProfileById = createAsyncThunk(
  "profile/get_by_id",
  async (payload: number, { rejectWithValue }) => {
    try {
      const { data } = await getUserByIdApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const subscribeToProfile = createAsyncThunk(
  "profile/subscribe",
  async (payload: Follow, { rejectWithValue }) => {
    try {
      const { data } = await followUserApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);
