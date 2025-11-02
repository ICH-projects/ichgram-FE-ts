import instance from "./instance";
import { fetchDecorator } from "../utils/fetchDecorator";
import type { User } from "../../typescript/types";

export const findUsersApi = fetchDecorator((payload: User) => {
  return instance.get("users/search", { params: { ...payload } });
});

export const getUserByIdApi = fetchDecorator((payload: number) => {
  return instance.get(`users/${payload}`);
});

export const updateUserApi = fetchDecorator((payload: User) => {
  return instance.putForm("users", { ...payload });
});
