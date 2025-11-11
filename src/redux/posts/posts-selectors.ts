import type { PostsStore, Store } from "../../typescript/types";

export const selectPosts = (store: Store): PostsStore => store.posts;
