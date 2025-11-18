import instance from "./instance";
import type { Post } from "../../typescript/types";

export const createPostApi = async (payload: Post) => {
  return await instance.postForm<Post>("posts", { ...payload });
};

export const getLastUpdatedPostsApi = async () => {
  return await instance.get<Post[]>("posts/updates");
};

export const getPostsApi = async () => {
  return await instance.get<Post[]>("posts");
};

export const findPostsApi = (payload: Post) => {
  return instance.get<Post[]>("posts", { params: { ...payload } });
};

export const deletePostByIdApi = async (payload: number) => {
  return await instance.delete<null>(`posts/${payload}`);
};
