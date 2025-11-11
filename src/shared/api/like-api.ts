import instance from "./instance";
import type { Like } from "../../typescript/types";

export const likePostApi = async (payload: Like) => {
  return await instance.post<Like>("likes", { ...payload });
};
