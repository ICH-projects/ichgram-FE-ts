import type { Store } from "../root-reducer";
import type { ModalStore } from "./modal-slice";

export const selectModal = (store: Store): ModalStore => store.modal;
