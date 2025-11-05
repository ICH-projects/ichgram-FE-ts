import instance from "./instance";
import { fetchDecorator } from "../../shared/utils/fetchDecorator";
import type { Comment } from "../../typescript/types";

export const createCommentApi = fetchDecorator<Comment>((payload) => {
  return instance.post("comments", { ...payload });
});
