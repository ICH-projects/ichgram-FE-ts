import type { Post, PostsStore, Store } from "../../typescript/types";

export const selectPostsStore = (store: Store): PostsStore => store.posts;

export const selectPostById =
  (id: number) =>
  (store: Store): Post | undefined =>
    store.posts.posts.find((p) => p.id === id);
