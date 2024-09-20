import API_URL from "./api_url";

const TEAM_API_URL = API_URL + "teams/";

export const getTeamById = async (id: number) =>
  await fetch(TEAM_API_URL + String(id));

export const getTeams = async () => await fetch(TEAM_API_URL);
