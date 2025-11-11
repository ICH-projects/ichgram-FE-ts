import type { PostsStore, Store } from "../../typescript/types";

export const selectPostsStore = (store: Store): PostsStore => store.posts;
