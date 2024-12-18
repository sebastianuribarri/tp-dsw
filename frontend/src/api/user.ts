import axios from "axios";
import { User } from "../types/User";
import { getAuthHeaders } from ".";
//import API_URL from "./api_url";

const url = "http://localhost:5000/api/users";

//const url = `${API_URL}users`; // Ruta base actualizada
// Registrar usuario (sin headers)
export const registerUser = async (user: Partial<User>) => {
  const headers = getAuthHeaders();
  await axios.post(`${url}/register`, user, { headers: headers });
};

// Obtener usuario por ID (con headers)
export const getUserById = async (id: string) => {
  const headers = getAuthHeaders();
  return await axios.get(`${url}/${id}`, { headers });
};

// Eliminar usuario por ID (con headers)
export const deleteUser = async (id: string) => {
  const headers = getAuthHeaders();
  return await axios.delete(`${url}/${id}`, { headers });
};

// Seguir a un equipo (con headers)
export const followTeam = async (id: string, teamId: number) => {
  const headers = getAuthHeaders();
  return await axios.put(`${url}/follow`, { id, teamId }, { headers });
};

// Dejar de seguir a un equipo (con headers)
export const unfollowTeam = async (id: string, teamId: number) => {
  const headers = getAuthHeaders();
  return await axios.put(`${url}/unfollow`, { id, teamId }, { headers });
};

// Iniciar sesión (sin headers)
export const loginUser = async (username: string, password: string) =>
  await axios.post(`${url}/login`, { username, password });

// Actualizar contraseña (con headers)
export const updatePassword = async (id: string, password: string) => {
  const headers = getAuthHeaders();
  return await axios.put(`${url}/${id}/password`, { password }, { headers });
};
export const updateSubscription = async (id: string, plan: string) => {
  const headers = getAuthHeaders();
  return await axios.put(`${url}/${id}/change-plan`, { plan }, { headers });
}

export const changePlan = async (id: string) => {
  const headers = getAuthHeaders();
  return await axios.put(`${url}/${id}/change-plan`, { headers });
};
