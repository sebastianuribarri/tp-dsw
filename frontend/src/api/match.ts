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
  const headers = getAuthHeaders();
  return await axios.get(url + "live/", { headers });
};

export const getMatch = async (matchId: number) => {
  const headers = getAuthHeaders();
  return await axios.get(url + String(matchId), { headers });
};

export const getMatchesBySearch = async (search: string) => {
  const headers = getAuthHeaders();
  return await axios.get(url + `search?search=${search}`, { headers });
};

export async function getCalendar(month: number, teamIds: number[]) {
  const headers = getAuthHeaders();
  const full_url = `${url}calendar?month=${month}&teamIds=${teamIds.join(",")}`;
  console.log(full_url);
  return await axios.get(full_url, { headers });
}
