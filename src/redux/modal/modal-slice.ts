import { createSlice } from "@reduxjs/toolkit";

import type { ModalStore } from "../../typescript/types";

const initialModalState: ModalStore = {
  hidden: true,
  childType: null,
  childProps: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    showModal: (store, { payload }) => {
      store.hidden = false;
      store.childType = payload.childType;
      store.childProps = payload.childProps;
    },
    hideModal: (store) => {
      store.hidden = true;
    },
    toggleModal: (store) => {
      store.hidden = !store.hidden;
    },
  },
});

export const { showModal, hideModal, toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
