import { AxiosError } from "axios";
import { useState } from "react";

import type { FetchResponse } from "../../typescript/types";

function useRequest<T>() {
  const [state, setState] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (request: () => Promise<FetchResponse<T>>) => {
    setLoading(true);
    setError(null);
    const { data, error } = await request();
    setLoading(false);
    if (error) {
      return setError(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
    setState(data)
    return data;
  };

  return {
    state,
    setState,
    loading,
    setLoading,
    error,
    setError,
    sendRequest,
  };
}

export default useRequest;
