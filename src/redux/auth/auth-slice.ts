import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "../../shared/utils/redux";

import {
  // registerUser,
  getCurrentUser,
  loginUser,
  // logoutUser,
  // resetPassword,
  // updatePassword,
  // updateUser,
  refreshTokens,
} from "./auth-thunks";

import type { AuthStore } from "../../typescript/types";

const initialState: AuthStore = {
  loading: false,
  error: null,
  message: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, pending)
      .addCase(getCurrentUser.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.user = payload;
        store.message = "Login successfully";
      })
      .addCase(getCurrentUser.rejected, (store, { payload }) => {
        store.user = null;
        rejected(store, { payload });
      })

      .addCase(refreshTokens.pending, pending)
      .addCase(refreshTokens.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.error = null;
        // store.user = payload.user;
        store.message = payload.message;
      })
      .addCase(refreshTokens.rejected, (store, { payload }) => {
        store.user = null;
        rejected(store, { payload });
      })

      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.user = payload.user;
        store.message = payload.message;
      })
      .addCase(loginUser.rejected, rejected);
  },
  reducers: {},
});

export default authSlice.reducer;
