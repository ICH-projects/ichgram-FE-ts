import instance from "./instance";
import type { Comment } from "../../typescript/types";

export const addCommentApi = async (payload: Comment) => {
  return await instance.post<Comment>("comments", { ...payload });
};
