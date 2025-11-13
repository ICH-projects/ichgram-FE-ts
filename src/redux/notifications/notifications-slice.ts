import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "../../shared/utils/redux";

import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "./notifications-thunks";

import type { NotificationsStore } from "../../typescript/types";

const initialState: NotificationsStore = {
  loading: false,
  error: null,
  message: null,
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
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
        store.notifications = initialState.notifications;
        rejected(store, { payload });
      })

      .addCase(markAsRead.pending, pending)
      .addCase(markAsRead.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.notifications = store.notifications.filter(
          (n) => n.id !== payload
        );
        store.message = "Request successfully processed";
      })
      .addCase(markAsRead.rejected, (store, { payload }) => {
        store.notifications = initialState.notifications;
        rejected(store, { payload });
      })

      .addCase(markAllAsRead.pending, pending)
      .addCase(markAllAsRead.fulfilled, (store) => {
        store.loading = false;
        store.notifications = initialState.notifications;
        store.message = "Request successfully processed";
      })
      .addCase(markAllAsRead.rejected, (store, { payload }) => {
        store.notifications = initialState.notifications;
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
