import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "../../shared/utils/redux";

import { getNotifications } from "./notifications-thunks";

import type { NotificationsStore } from "../../typescript/types";

const initialState: NotificationsStore = {
  loading: false,
  error: null,
  message: null,
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, pending)
      .addCase(getNotifications.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.notifications = payload;
        store.message = "Request successfully processed";
      })
      .addCase(getNotifications.rejected, (store, { payload }) => {
        store.notifications = [];
        rejected(store, { payload });
      });
  },
  reducers: {
    addNotification: (store, { payload }) => {
      if (store.notifications.some((n) => n.id === payload.id)) return;
      store.notifications.unshift(payload);
    },
  },
});

export const { addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
