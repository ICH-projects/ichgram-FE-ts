import instance from "./instance";
import { fetchDecorator } from "../../shared/utils/fetchDecorator";
import type { Post } from "../../typescript/types";

export const createPostApi = fetchDecorator<Post>((payload) => {
  return instance.postForm("posts", { ...payload });
});

export const getLastUpdatedPostsApi = async () => {
  return await instance.get<Post[]>("posts/updates");
};

export const getPostsApi = () => {
  return instance.get<Post[]>("posts");
};

export const findPostsApi = fetchDecorator((payload) => {
  return instance.get("posts", { params: { ...payload } });
});

export const deletePostByIdApi = (payload: number) => {
  return instance.delete<null>(`posts/${payload}`);
};
