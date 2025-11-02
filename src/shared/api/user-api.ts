import instance from "./instance";
import { fetchDecorator } from "../utils/fetchDecorator";

export const findUsersApi = fetchDecorator((payload) => {
  return instance.get("users/search", { params: { ...payload } });
});

export const getUserByIdApi = fetchDecorator((payload) => {
  return instance.get(`users/${payload}`);
});

export const updateUserApi = fetchDecorator((payload) => {
  return instance.putForm("users", { ...payload });
});
