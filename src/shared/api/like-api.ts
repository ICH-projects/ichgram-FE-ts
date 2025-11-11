import instance from "./instance";
import { fetchDecorator } from "../../shared/utils/fetchDecorator";
import type { Like } from "../../typescript/types";

export const likePostApi = fetchDecorator<Like>((payload) => {
  return instance.post("likes", { ...payload });
});

export const likePostApiThunk = (payload: Like) => {
  return instance.post<Like>("likes", { ...payload });
};
