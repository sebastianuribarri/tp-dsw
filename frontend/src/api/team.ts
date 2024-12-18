import API_URL, { getAuthHeaders } from ".";

const TEAM_API_URL = API_URL + "teams/";

export const getTeamById = async (id: number) => {
  const headers = getAuthHeaders();
  return await fetch(TEAM_API_URL + String(id), {
    method: "GET",
    headers: headers,
  });
};

export const getAllTeams = async () => {
  const headers = getAuthHeaders();
  return await fetch(TEAM_API_URL, {
    method: "GET",
    headers: headers,
  });
};

export const getTeamsBySearch = async (search: string) => {
  const headers = getAuthHeaders();
  return await fetch(TEAM_API_URL + `search?search=${search}`, {
    method: "GET",
    headers: headers,
  });
};
