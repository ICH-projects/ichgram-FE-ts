import type { IAuthStore } from "../../redux/auth/auth-slice.ts";

export const pending = (store: IAuthStore) => {
  store.loading = true;
  store.error = null;
  store.message = null;
};

export const rejected = (
  store: IAuthStore,
  { payload }: { payload: unknown }
) => {
  store.loading = false;
  store.error = payload as string;
  store.message = null;
};
