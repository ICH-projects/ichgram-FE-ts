import instance from "./instance";
import { refreshTokens } from "../../redux/auth/auth-thunks";
import type { EnhancedStore } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../redux/store";

const setupInterceptors = (store: EnhancedStore) => {
  const dispatch = store.dispatch as AppDispatch;

  instance.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
      const message = error.response?.data?.message || error.message;
      const originalRequest = error.config;

      if (error.status === 401 && !originalRequest._retry) {
        if (
          ["AccessToken not found", "AccessToken verification failed"].includes(
            message
          )
        ) {
          originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
          try {
            await dispatch(refreshTokens()); // dispatch typed as any to allow async thunk
            return instance(originalRequest); // Retry the original request with the new access token.
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    }
  );

  instance.interceptors.request.use(
    (request) => {
      if (request.data && typeof request.data === "object") {
        const cleanedData: { [key: string]: unknown } = {};
        for (const key in request.data) {
          const value = request.data[key];
          // Exclude null, undefined, and empty strings
          if (value !== null && value !== undefined && value !== "") {
            cleanedData[key] = value;
          }
        }
        request.data = cleanedData;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
