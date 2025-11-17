import { createSlice } from "@reduxjs/toolkit";

import { pending, rejected } from "../../shared/utils/redux";

import type { ProfileStore } from "../../typescript/types";
import { subscribeToProfile, getProfileById } from "./profile-thunks";

const initialState: ProfileStore = {
  loading: false,
  error: null,
  message: null,
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProfileById.pending, pending)
      .addCase(getProfileById.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.profile = payload;
        store.message = "Profile successfully retrieved";
      })
      .addCase(getProfileById.rejected, (store, { payload }) => {
        store.profile = initialState.profile;
        rejected(store, { payload });
      })

      .addCase(subscribeToProfile.pending, pending)
      .addCase(subscribeToProfile.fulfilled, (store) => {
        store.loading = false;
        if (store.profile) {
          store.profile.isFollowed = true;
          store.profile.totalFollowers =
            (store.profile.totalFollowers ?? 0) + 1;
        }
        store.message = "Follow successfully created";
      })
      .addCase(subscribeToProfile.rejected, (store, { payload }) => {
        rejected(store, { payload });
      });
  },
  reducers: {},
});

export default profileSlice.reducer;
