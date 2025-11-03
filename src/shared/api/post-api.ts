import instance from "./instance";
import { fetchDecorator } from "../../shared/utils/fetchDecorator";

export const createPostApi = fetchDecorator((payload) => {
  return instance.postForm("posts", { ...payload });
});

export const getLastUpdatedPostsApi = fetchDecorator(() => {
  return instance.get("posts/updates");
});

export const getPostsApi = fetchDecorator(() => {
  return instance.get("posts");
});

export const findPostsApi = fetchDecorator((payload) => {
  return instance.get("posts", { params: { ...payload } });
});

export const getPostByIdApi = fetchDecorator((payload) => {
  return instance.get(`posts/${payload}`);
});

export const deletePostByIdApi = fetchDecorator((payload) => {
  return instance.delete(`posts/${payload}`);
});
