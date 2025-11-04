import type { AxiosError } from "axios";
import type { ResponseData } from "../../typescript/types";

export const fetchDecorator = <
  T = unknown,
  R extends { data: ResponseData<T> } = { data: ResponseData<T> },
  E = AxiosError<{ message: string }>
>(
  request: <T>(payload: T) => Promise<R>
) => {
  return async <T>(payload?: T) => {
    try {
      const res = await request(payload);
      return { data: res.data, error: null };
    } catch (error) {
      return { data: null, error: error as E };
    }
  };
};
