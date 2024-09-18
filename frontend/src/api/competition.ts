
import API_URL from "./api_url";
const url = API_URL + "competitions/"

export const getCompetitionsByTeam = async (teamId: number) =>
  await fetch(url + "team/" + String(teamId));

export const getCompetitionById = async (id: number) =>
  await fetch(url + String(id));

export const getAllCompetitions = async() => 
  await fetch (url);
