import API_URL, { getAuthHeaders } from ".";
import axios from "axios";


const TEAM_API_URL = API_URL + "teams/";

export const getTeamById = async (id: number) => {
  const headers = getAuthHeaders();
  return await axios.get(`${TEAM_API_URL}${id}`, { headers }
  );};

export const getAllTeams = async () => {
  const headers = getAuthHeaders();
  return await axios.get(`${TEAM_API_URL}`, { headers }
  );
};

export const getTeamsBySearch = async (search: string) => {
  const headers = getAuthHeaders();
  return await axios.get(`${TEAM_API_URL}${search}`, { headers }
  );
};
