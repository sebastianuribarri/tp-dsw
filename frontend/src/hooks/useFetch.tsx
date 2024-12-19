import { AxiosResponse } from "axios";
import { useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = async <T,>(
    fetchFunction: () => Promise<Promise<AxiosResponse<any, any>>>
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      // Ejecuta la función fetch con los headers de autenticación
      const response = await fetchFunction();

      // Si la respuesta tiene un `.data` (axios), úsalo directamente
      const result = response.data;

      return { data: result, error: null, loading: false };
    } catch (err: any) {
      console.error("Error in API call:", err);
      setError(err.message || "Occurrio un al obtener los datos");
      return {
        data: null,
        error: err.message || "Occurrio un al obtener los datos",
        loading: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export default useFetch;
