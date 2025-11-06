import type { AxiosError } from "axios";

export const fetchDecorator = <
  D = unknown,
  E extends AxiosError<{ message: string }> = AxiosError<{ message: string }>
>(
  request: <P>(payload: P) => Promise<{ data: D }>
) => {
  return async <P>(payload?: P) => {
    try {
      const res = await request(payload);
      return { data: res.data, error: null };
    } catch (error) {
      return { data: null, error: error as E };
    }
  };
};
