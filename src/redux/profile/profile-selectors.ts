import type { Store, StoreAsync, User } from "../../typescript/types";

export const selectProfileServiceData = (store: Store): StoreAsync =>
  store.profile;

export const selectProfile = (store: Store): User | null =>
  store.profile.profile;
