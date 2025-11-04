import { useState } from "react";

import type { FetchResponse } from "../../typescript/types";

function useRequest<T, E>() {
  const [state, setState] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);

  const sendRequest = async (
    request: () => Promise<FetchResponse<T, E >>
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
