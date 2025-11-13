import { createSelector } from "@reduxjs/toolkit";

import type {
  Post,
  PostsStore,
  Store,
  StoreAsync,
} from "../../typescript/types";

const selectAllPosts = (store: Store): Post[] => store.posts.posts;

export const selectPostsStore = (store: Store): PostsStore => store.posts;

export const selectLastUpdatedPosts = (userId: number) =>
  createSelector(selectAllPosts, (posts) => {
    return [...posts]
      .filter((p) => p.userId === userId)
      .sort((a, b) => Number(a.updatedAt) - Number(b.updatedAt));
  });

export const selectPostsServiceData = (store: Store): StoreAsync => store.posts;

export const selectPosts = createSelector(selectAllPosts, (posts) => {
  return [...posts].sort((a, b) => Number(a.updatedAt) - Number(b.updatedAt));
});
