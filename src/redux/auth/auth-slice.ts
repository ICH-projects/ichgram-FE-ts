import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "../../shared/utils/redux";

import {
  // registerUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  // logoutUser,
  // resetPassword,
  // updatePassword,
  // updateUser,
  refreshTokens,
  signupUser,
} from "./auth-thunks";

import type { AuthStore } from "../../typescript/types";
import { updateUser } from "../profile/profile-thunks";

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
      .addCase(loginUser.rejected, rejected)

      .addCase(logoutUser.pending, pending)
      .addCase(logoutUser.fulfilled, (store) => {
        store.loading = false;
        store.user = null;
        store.message = null;
      })
      .addCase(logoutUser.rejected, rejected)

      .addCase(updateUser.pending, pending)
      .addCase(updateUser.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.user = { ...store.user, ...payload };
        store.message = "Profile successfully updated";
      })
      .addCase(updateUser.rejected, (store, { payload }) => {
        rejected(store, { payload });
      })

      .addCase(signupUser.pending, pending)
      .addCase(signupUser.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.message = payload;
      })
      .addCase(signupUser.rejected, (store, { payload }) => {
        rejected(store, { payload });
      });
  },
  reducers: {},
});

export default authSlice.reducer;
