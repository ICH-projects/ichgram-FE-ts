import type { ModalStore, Store } from "../../typescript/types";

export const selectModal = (store: Store): ModalStore => store.modal;
