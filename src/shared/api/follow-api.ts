import instance from "./instance";
import type { Follow } from "../../typescript/types";

export const followUserApi = async (payload: Follow) => {
  return await instance.post<Follow>("follows", { ...payload });
};
