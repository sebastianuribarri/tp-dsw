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
  return await axios.get(url + "live/");
};

export const getMatch = async (matchId: number) => {
  const headers = getAuthHeaders();
  return await axios.get(url + String(matchId), { headers });
};

export const getMatchesBySearch = async (search: string) => {
  const headers = getAuthHeaders();
  return await axios.get(url + `search?search=${search}`, { headers });
};
