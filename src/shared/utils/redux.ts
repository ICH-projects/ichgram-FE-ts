import type { StoreAsync } from "../../typescript/types";

export const pending = <T extends StoreAsync>(store: T) => {
  store.loading = true;
  store.error = null;
  store.message = null;
};

export const rejected = <T extends StoreAsync>(
  store: T,
  { payload }: { payload: unknown }
) => {
  store.loading = false;
  store.error = payload as string;
  store.message = null;
};
