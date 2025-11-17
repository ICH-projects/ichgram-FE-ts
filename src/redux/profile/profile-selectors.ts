import type { Post, Store, StoreAsync, User } from "../../typescript/types";

export const selectProfileServiceData = (store: Store): StoreAsync =>
  store.profile;

export const selectProfile = (
  store: Store
): (User & { posts: Post[] }) | null => store.profile.profile;
