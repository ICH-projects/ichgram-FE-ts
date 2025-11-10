import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer, { type AuthStore } from "./auth/auth-slice";
import modalReducer, { type ModalStore } from "./modal/modal-slice";

export type Store = {
  auth: AuthStore;
  modal: ModalStore;
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  modal: modalReducer,
});

export default rootReducer;
