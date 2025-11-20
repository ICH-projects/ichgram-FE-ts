import instance from "./instance";
import { fetchDecorator } from "../utils/fetchDecorator";

import type { User } from "../../typescript/types";

export const signupUserApi = async (payload: User): Promise<string> => {
  const { data } = await instance.post<string>("/auth/signup", payload);
  return data;
};

export const confirmEmailApi = fetchDecorator((token) =>
  instance.get("/auth/verify", { params: { token } })
);

export const loginUserApi = async (payload: User) => {
  const { data } = await instance.post("/auth/login", payload);
  return data;
};

export const resetPasswordApi = async (payload: User) => {
  const { data } = await instance.post("/auth/reset", payload);
  return data;
};

export const updatePasswordApi = async ({
  values,
  token,
}: {
  values: string;
  token: string;
}) => {
  const { data } = await instance.put("/auth/update", values, {
    params: { token },
  });
  return data;
};

export const getCurrentUserApi = async () => {
  const { data } = await instance.get("/auth/current");
  return data;
};

export const refreshTokensApi = async () => {
  const { data } = await instance.get("/auth/refresh");
  return data;
};

export const logoutUserApi = async () => {
  const { data } = await instance.get("/auth/logout");
  return data;
};
