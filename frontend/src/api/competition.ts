import axios from "axios";
import API_URL, { getAuthHeaders } from ".";
const url = API_URL + "competitions/";

export const getCompetitionsByTeam = async (teamId: number) => {
  const headers = getAuthHeaders();
  return await fetch(url + "team/" + String(teamId), {
    method: "GET",
    headers: headers,
  });
};

export const getCompetitionById = async (id: number) => {
  const headers = getAuthHeaders();
  return await fetch(url + String(id), {
    method: "GET",
    headers: headers,
  });
};

export const getAllCompetitions = async () => {
  const headers = getAuthHeaders();
  return await axios.get(url, { headers: headers });
};

export const getCompetitionsBySearch = async (search: string) => {
  const headers = getAuthHeaders();
  return await axios.get(url + `search?search=${search}`, { headers: headers });
};
