import axios from "axios";
import API_URL, { getAuthHeaders } from ".";
const url = API_URL + "matches/";

export const getMatches = async (filters: object) => {
  const headers = getAuthHeaders();
  return await axios.get(url, { params: filters, headers });
};

export const getMatchesByTeam = async (teamId: number) => {
  const headers = getAuthHeaders();
  return await axios.get(url + "team/" + String(teamId), { headers });
};

export const getMatchesByTeams = async (teamsIds: number[]) => {
  const headers = getAuthHeaders();
  return await axios.get(url + "teams/", {
    params: {
      teamIds: teamsIds.join(","),
    },
    headers,
  });
};

export const getLiveMatches = async () => {
<<<<<<< HEAD
  return await axios.get(url + "live/");
};

export const getMatch = async (matchId: number) => {
  await axios.get(url + String(matchId));
=======
  const headers = getAuthHeaders();
  return await axios.get(url + "live/", { headers });
};

export const getMatch = async (matchId: number) => {
  const headers = getAuthHeaders();
  return await axios.get(url + String(matchId), { headers });
>>>>>>> b37c2e854284f933839e8120dd74c1bb7d90bef2
};

export const getMatchesBySearch = async (search: string) => {
  const headers = getAuthHeaders();
  return await axios.get(url + `search?search=${search}`, { headers });
};