import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  signupUserApi,
  getCurrentUserApi,
  logoutUserApi,
  loginUserApi,
  resetPasswordApi,
  updatePasswordApi,
  refreshTokensApi,
} from "../../shared/api/auth-api";
import { updateUserApi } from "../../shared/api/user-api.ts";
import type { User } from "../../typescript/types.ts";

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (payload: User, { rejectWithValue }) => {
    try {
      const data = await signupUserApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: User, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: User, { rejectWithValue }) => {
    try {
      const data = await resetPasswordApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (payload: { values: string; token: string }, { rejectWithValue }) => {
    try {
      const data = await updatePasswordApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updatePublicData",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCurrentUserApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  },
  {
    // condition: (_, { getState }) => {
    //     const { auth } = getState();
    //     console.log(auth);
    //     return Boolean(auth.user);
    // }
  }
);

export const refreshTokens = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const data = await refreshTokensApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  },
  {
    // condition: (_, { getState }) => {
    //     const { auth } = getState();
    //     console.log(auth);
    //     return Boolean(auth.user);
    // }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutUserApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);
