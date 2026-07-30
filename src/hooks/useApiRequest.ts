import { useState } from "react";

export function useApiRequest<T>() {
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const execute = async (apiCall: () => Promise<T>) => {
    try {
      setError(false);

      const result = await apiCall();

      setData(result);

      return result;
    } catch (err) {
      console.error(err);
      setError(true);
      return null;
    } 
  };

  return {
    error,
    data,
    execute,
    setData,
    setError,
  };
}