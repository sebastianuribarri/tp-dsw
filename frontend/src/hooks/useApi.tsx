import { useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = async <T,>(
    fetchFunction: () => Promise<Response | { data: T }>
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      // Ejecuta la función fetch con los headers de autenticación
      const response = await fetchFunction();

      // Si la respuesta tiene un `.data` (axios), úsalo directamente
      const result = "data" in response ? response.data : await response.json();

      return { data: result, error: null, loading: false };
    } catch (err: any) {
      console.error("Error in API call:", err);
      setError(err.message || "An error occurred");
      return {
        data: null,
        error: err.message || "An error occurred",
        loading: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export default useApi;
