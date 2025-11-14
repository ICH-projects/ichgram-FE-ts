import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "../../shared/utils/redux";

import { findUsers } from "./search-thunks";

import type { SearchStore } from "../../typescript/types";

const initialState: SearchStore = {
  loading: false,
  error: null,
  message: null,
  result: [],
  recent: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(findUsers.pending, pending)
      .addCase(findUsers.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.result = payload;
        store.message = "Request successfully processed";
      })
      .addCase(findUsers.rejected, (store, { payload }) => {
        store.result = initialState.result;
        rejected(store, { payload });
      });
  },
  reducers: {
    addRecent: (store, { payload }) => {
      if (store.recent.some((u) => u.id === payload.id)) return;
      store.recent.unshift(payload);
    },
    removeRecent: (store, { payload }) => {
      store.recent = store.recent.filter((u) => u.id !== payload);
    },
    clearResult: (store) => {
      store.result = initialState.result;
    },
  },
});

export const { addRecent, removeRecent, clearResult } = searchSlice.actions;

export default searchSlice.reducer;
