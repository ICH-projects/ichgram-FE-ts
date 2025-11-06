import instance from "./instance";
import { fetchDecorator } from "../../shared/utils/fetchDecorator";
import type { Post } from "../../typescript/types";

export const createPostApi = fetchDecorator<Post>((payload) => {
  return instance.postForm("posts", { ...payload });
});

export const getLastUpdatedPostsApi = fetchDecorator<Post[]>(() => {
  return instance.get("posts/updates");
});

export const getPostsApi = fetchDecorator(() => {
  return instance.get("posts");
});

export const findPostsApi = fetchDecorator((payload) => {
  return instance.get("posts", { params: { ...payload } });
});

export const getPostByIdApi = fetchDecorator<Post>((payload) => {
  return instance.get(`posts/${payload}`);
});

export const deletePostByIdApi = fetchDecorator<void>((payload) => {
  return instance.delete(`posts/${payload}`);
});
