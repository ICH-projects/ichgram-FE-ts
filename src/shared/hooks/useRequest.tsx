import { useState } from "react";

import type { FetchResponse } from "../../typescript/types";
import type { AxiosError } from "axios";

function useRequest<D>() {
  const [state, setState] = useState<D | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError<{ message: string }> | null>(null);

  const sendRequest = async (
    request: <P>(payload?: P) => Promise<FetchResponse<D>>
  ) => {
    setLoading(true);
    setError(null);
    const { data, error } = await request();
    setLoading(false);
    if (error) {
      return setError(error);
    }
    setState(data);
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
