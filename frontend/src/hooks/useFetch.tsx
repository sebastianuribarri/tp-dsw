import { useEffect, useState } from "react";
import axios from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T,>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFunction();
        setState({ data, loading: false, error: null });
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          // Manejo de errores específicos de Axios
          if (error.response) {
            // La respuesta del servidor indica un error (4xx, 5xx)
            setState({
              data: null,
              loading: false,
              error: `Error ${error.response.status}: ${
                error.response.data?.message || "Error desconocido del servidor"
              }`,
            });
          } else if (error.request) {
            // No se recibió respuesta del servidor
            setState({
              data: null,
              loading: false,
              error: "Error de conexión al servidor",
            });
          } else {
            // Error al configurar la solicitud
            setState({
              data: null,
              loading: false,
              error: `Error al realizar la solicitud: ${error.message}`,
            });
          }
        } else {
          setState({
            data: null,
            loading: false,
            error: error.message || "Error desconocido",
          });
        }
      }
    };
    setState({ data: null, loading: true, error: null });
    fetchData();
  }, dependencies);

  return state;
};
