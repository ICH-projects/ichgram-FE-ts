import type { AuthStore } from "../../redux/auth/auth-slice";

export const pending = (store: AuthStore) => {
  store.loading = true;
  store.error = null;
  store.message = null;
};

export const rejected = (
  store: AuthStore,
  { payload }: { payload: unknown }
) => {
  store.loading = false;
  store.error = payload as string;
  store.message = null;
};
