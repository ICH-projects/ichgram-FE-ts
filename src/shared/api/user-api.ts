import instance from "./instance";
import { fetchDecorator } from "../utils/fetchDecorator";
import type { Post, User } from "../../typescript/types";

export const findUsersApi = (payload: User) => {
  return instance.get<User[]>("users/search", { params: { ...payload } });
};

export const getUserByIdApi = (userId: number) => {
  return instance.get<User & { posts: Post[] }>(`users/${userId}`);
};

export const updateUserApi = fetchDecorator((payload) => {
  return instance.putForm("users", { ...payload });
});
