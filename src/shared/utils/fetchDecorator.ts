import type { AxiosResponse } from "axios";



export const fetchDecorator = (
  request: <T>(payload: T) => Promise<AxiosResponse>
) => {
  return async <T>(payload?: T) => {
    try {
      const { data } = await request(payload);
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error };
    }
  };
};
