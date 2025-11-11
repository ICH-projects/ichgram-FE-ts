import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "../../shared/utils/redux";

import { getLastUpdatedPosts } from "./posts-thunks";

import type { PostsStore } from "../../typescript/types";

const initialState: PostsStore = {
  loading: false,
  error: null,
  message: null,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLastUpdatedPosts.pending, pending)
      .addCase(getLastUpdatedPosts.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.posts = payload;
        store.message = "Request successfully processed";
      })
      .addCase(getLastUpdatedPosts.rejected, (store, { payload }) => {
        store.posts = [];
        rejected(store, { payload });
      });

    
  },
  reducers: {},
});

export default postsSlice.reducer;
