import API_URL from "./api_url";

export const getCompetitionsByTeam = async (teamId: number) =>
  await fetch(API_URL + "team/" + String(teamId));

export const getCompetitionById = async (id: number) =>
  await fetch(API_URL + String(id));
