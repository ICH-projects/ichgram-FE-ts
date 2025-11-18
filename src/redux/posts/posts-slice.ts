import { createSlice } from "@reduxjs/toolkit";

import { mergeArraysDistinct } from "../../shared/utils/arrays";

import { pending, rejected } from "../../shared/utils/redux";

import {
  likePost,
  getLastUpdatedPosts,
  addComment,
  deletePost,
  getPosts,
  createPost,
  findPosts,
} from "./posts-thunks";
import { subscribeToProfile, updateUser } from "../profile/profile-thunks";
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
        store.posts = mergeArraysDistinct(store.posts, payload);
        store.message = "Posts successfully retrieved";
      })
      .addCase(getLastUpdatedPosts.rejected, (store, { payload }) => {
        store.posts = [];
        rejected(store, { payload });
      })

      .addCase(getPosts.pending, pending)
      .addCase(getPosts.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.posts = mergeArraysDistinct(store.posts, payload);
        store.message = "Posts successfully retrieved";
      })
      .addCase(getPosts.rejected, (store, { payload }) => {
        store.posts = [];
        rejected(store, { payload });
      })

      .addCase(findPosts.pending, pending)
      .addCase(findPosts.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.posts = mergeArraysDistinct(store.posts, payload);
        store.message = "Profile successfully retrieved";
      })
      .addCase(findPosts.rejected, (store, { payload }) => {
        rejected(store, { payload });
      })

      .addCase(createPost.pending, pending)
      .addCase(createPost.fulfilled, (store, { payload }) => {
        store.loading = false;
        if (!payload) return;
        store.posts.unshift(payload);
        store.message = "Post successfully created";
      })
      .addCase(createPost.rejected, (store, { payload }) => {
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

      .addCase(subscribeToProfile.pending, pending)
      .addCase(subscribeToProfile.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.posts.map((post) => {
          if (post.user.id === payload.targetUserId)
            (post.user.followers || []).push(payload);
          return post;
        });
        store.message = "Follow successfully created";
      })
      .addCase(subscribeToProfile.rejected, (store, { payload }) => {
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
      })

      .addCase(updateUser.pending, pending)
      .addCase(updateUser.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.posts.map((p) => {
          if (p.userId === payload.id) {
            p.user = { ...p.user, ...payload };
          }
        });
        store.message = "Profile successfully updated";
      })
      .addCase(updateUser.rejected, (store, { payload }) => {
        rejected(store, { payload });
      });
  },
  reducers: {},
});

export default postsSlice.reducer;
