import instance from "./instance";
import type { Like } from "../../typescript/types";

export const likePostApi = (payload: Like) => {
  return instance.post<Like>("likes", { ...payload });
};
