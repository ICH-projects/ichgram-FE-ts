import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { getLastUpdatedPostsThunkApi } from "../../shared/api/post-api";

export const getLastUpdatedPosts = createAsyncThunk(
  "posts/updates",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getLastUpdatedPostsThunkApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);
