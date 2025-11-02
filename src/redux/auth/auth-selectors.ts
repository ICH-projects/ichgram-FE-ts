import type { Store, AuthStore, User } from "../../typescript/types";

export const selectAuth = (store: Store): AuthStore => store.auth;

export const selectIsLogin = (store: Store): boolean =>
  Boolean(store.auth.user);

export const selectUser = (store: Store): User | null => store.auth.user;
