import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "../../shared/utils/redux";

import {
  likePost,
  getLastUpdatedPosts,
  addComment,
  followUser,
  deletePost,
  getPosts,
} from "./posts-thunks";

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
      })

      .addCase(getPosts.pending, pending)
      .addCase(getPosts.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.posts = payload;
        store.message = "Request successfully processed";
      })
      .addCase(getPosts.rejected, (store, { payload }) => {
        store.posts = [];
        rejected(store, { payload });
      })


      .addCase(addComment.pending, pending)
      .addCase(addComment.fulfilled, (store, { payload }) => {
        store.loading = false;
        const post = store.posts.find((item) => item.id === payload.postId);
        if (!post) return;
        post.totalComments = (post.totalComments || 0) + 1;
        if (!post.comments) post.comments = [];
        post.comments.unshift(payload);
        store.message = "Comment successfully created";
      })
      .addCase(addComment.rejected, (store, { payload }) => {
        rejected(store, { payload });
      })

      .addCase(likePost.pending, pending)
      .addCase(likePost.fulfilled, (store, { payload }) => {
        store.loading = false;
        const post = store.posts.find((item) => item.id === payload.postId);
        if (!post) return;
        post.totalLikes = (post.totalLikes || 0) + 1;
        post.isLiked = true;
        store.message = "Like successfully created";
      })
      .addCase(likePost.rejected, (store, { payload }) => {
        rejected(store, { payload });
      })

      .addCase(followUser.pending, pending)
      .addCase(followUser.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.posts.map((post) => {
          if (post.user.id === payload.targetUserId)
            (post.user.followers || []).push(payload);
          return post;
        });
        store.message = "Follow successfully created";
      })
      .addCase(followUser.rejected, (store, { payload }) => {
        rejected(store, { payload });
      })

      .addCase(deletePost.pending, pending)
      .addCase(deletePost.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.posts = store.posts.filter((p) => p.id !== payload);
        store.message = "Post successfully deleted";
      })
      .addCase(deletePost.rejected, (store, { payload }) => {
        rejected(store, { payload });
      });
  },
  reducers: {},
});

export default postsSlice.reducer;
