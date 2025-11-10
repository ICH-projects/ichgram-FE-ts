import type { Store } from "../root-reducer";
import type { User } from "../../typescript/types";
import type { AuthStore } from "./auth-slice";

export const selectAuth = (store: Store): AuthStore => store.auth;

export const selectIsLogin = (store: Store): boolean =>
  Boolean(store.auth.user);

export const selectUser = (store: Store): User | null => store.auth.user;
