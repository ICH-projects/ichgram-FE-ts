import instance from "./instance";

import type { User } from "../../typescript/types";

export const signupUserApi = async (payload: User): Promise<string> => {
  const { data } = await instance.post<string>("/auth/signup", payload);
  return data;
};

export const confirmEmailApi = (token: string) =>
  instance.get("/auth/confirm", { params: { token } });

export const loginUserApi = async (payload: User) => {
  const { data } = await instance.post("/auth/login", payload);
  return data;
};

export const resetPasswordApi = async (email: string) => {
  const  data  = await instance.post<string>("/auth/reset", { email });
  return data;
};

export const updatePasswordApi = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  const  data  = await instance.put(
    "/auth/update",
    { password },
    {
      params: { token },
    }
  );
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
