import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  getCurrentUserApi,
  refreshTokensApi,
  loginUserApi,
  logoutUserApi,
  signupUserApi,
  confirmEmailApi,
  resetPasswordApi,
  updatePasswordApi,
} from "../../shared/api/auth-api";
import type { User } from "../../typescript/types";

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

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (payload: User, { rejectWithValue }) => {
    try {
      const data: string = await signupUserApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const confirmEmail = createAsyncThunk(
  "auth/confirm_email",
  async (payload: string, { rejectWithValue }) => {
    try {
      const { data } = await confirmEmailApi(payload);
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
  "auth/reset_password",
  async (payload: string, { rejectWithValue }) => {
    try {
      const { data } = await resetPasswordApi(payload);
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
  "auth/update_password",
  async (payload: {password: string, token: string}, { rejectWithValue }) => {
    try {
      const { data } = await updatePasswordApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);
