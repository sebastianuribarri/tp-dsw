import API_URL from "./api_url";

export const getTeamById = async (id: number) =>
  await fetch(API_URL + String(id));

export const getTeams = async () => await fetch(API_URL);
