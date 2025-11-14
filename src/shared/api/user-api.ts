import instance from "./instance";
import { fetchDecorator } from "../utils/fetchDecorator";
import type { User } from "../../typescript/types";

export const findUsersApi = (payload: User) => {
  return instance.get<User[]>("users/search", { params: { ...payload } });
};

export const getUserByIdApi = fetchDecorator((payload) => {
  return instance.get(`users/${payload}`);
});

export const updateUserApi = fetchDecorator((payload) => {
  return instance.putForm("users", { ...payload });
});
