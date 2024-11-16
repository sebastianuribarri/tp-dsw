import axios from "axios";
import { User } from "../types/User";
import API_URL from "./api_url";


const url = `${API_URL}users`; // Ruta base actualizada

// Registrar usuario
export const registerUser = async (user: Partial<User>) =>
  await axios.post(`${url}/register`, user);
// Obtener usuario por ID
export const getUserById = async (id: string) =>
  await axios.get(`${url}/${id}`);
// Eliminar usuario por ID
export const deleteUser = async (id: string) =>
  await axios.delete(`${url}/${id}`);

// Seguir a un equipo
export const followTeam = async (id: string, teamId: number) =>
  await axios.put(`${url}/follow`, { id, teamId });
// Dejar de seguir a un equipo
export const unfollowTeam = async (id: string, teamId: number) =>
  await axios.put(`${url}/unfollow`, { id, teamId });
// Iniciar sesión
export const loginUser = async (username: string, password: string) =>
  await axios.post(`${url}/login`, { username, password });
// Actualizar contraseña
export const updatePassword = async (id: string, password: string) =>
  await axios.put(`${url}/${id}/password`, { password });
