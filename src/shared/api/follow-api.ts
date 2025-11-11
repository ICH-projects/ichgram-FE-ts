import instance from "./instance";
import type { Follow } from "../../typescript/types";

export const followUserApi = (payload: Follow) => {
  return instance.post<Follow>("follows", { ...payload });
};
