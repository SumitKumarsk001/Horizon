import { useState } from "react";

export function useApiRequest<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const execute = async (apiCall: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(false);

      const result = await apiCall();

      setData(result);

      return result;
    } catch (err) {
      console.error(err);
      setError(true);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    execute,
    setData,
    setError,
  };
}