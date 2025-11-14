import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { findUsersApi } from "../../shared/api/user-api";
import type { User } from "../../typescript/types";

export const findUsers = createAsyncThunk(
  "search/find",
  async (payload: User, { rejectWithValue }) => {
    try {
      const { data } = await findUsersApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);


