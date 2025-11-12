import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth-slice";
import modalReducer from "./modal/modal-slice";
import postsReducer from "./posts/posts-slice";
import notificationsReducer from "./notifications/notifications-slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  modal: modalReducer,
  posts: postsReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
