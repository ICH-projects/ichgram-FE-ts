import instance from "./instance";
import type { Comment } from "../../typescript/types";

export const addCommentApi = (payload: Comment) => {
  return instance.post<Comment>("comments", { ...payload });
};
