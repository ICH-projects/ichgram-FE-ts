import instance from "./instance";
import type { Post, User } from "../../typescript/types";

export const findUsersApi = (payload: User) => {
  return instance.get<User[]>("users/search", { params: { ...payload } });
};

export const getUserByIdApi = (userId: number) => {
  return instance.get<User & { posts: Post[] }>(`users/${userId}`);
};

export const updateUserApi = (payload: User) => {
  return instance.putForm<User>("users", { ...payload });
};
