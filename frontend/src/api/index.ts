const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = "todo-fulbo-api.onrender.com/api/";
export default API_URL;

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem("authToken"); // Obtener token del localStorage
  console;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
