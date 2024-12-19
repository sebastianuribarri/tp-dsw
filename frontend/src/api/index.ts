const API_URL = import.meta.env.VITE_API_URL;

export default API_URL;

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem("authToken");
  console.log("token enviado", token);
  return {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
