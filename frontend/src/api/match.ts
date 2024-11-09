import axios from "axios";
import API_URL from "./api_url";
const url = API_URL + "matches/";

export const getMatches = async (filters: Record<string, any>) =>
  await axios.get(url, filters);

export const getMatchesByTeam = async (teamId: number) =>
  await axios.get(url + "team/" + String(teamId));

export const getLiveMatches = async () => await axios.get(url + "live/");

export const getMatch = async (matchId: number) =>
  await axios.get(url + String(matchId));
