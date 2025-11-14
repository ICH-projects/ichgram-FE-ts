import type { SearchStore, Store } from "../../typescript/types";

export const selectSearch = (store: Store): SearchStore => store.search;
