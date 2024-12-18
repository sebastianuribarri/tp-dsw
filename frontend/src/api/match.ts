import axios from "axios";
import API_URL from ".";
const url = API_URL + "matches/";

export const getMatches = async (filters: object) =>
  await axios.get(url, { params: filters });

export const getMatchesByTeam = async (teamId: number) =>
  await axios.get(url + "team/" + String(teamId));

export const getMatchesByTeams = async (teamsIds: number[]) =>
  await axios.get(url + "teams/", {
    params: {
      teamIds: teamsIds.join(","),
    },
  });

export const getLiveMatches = async () => {
  return await axios.get(url + "live/");
};

export const getMatch = async (matchId: number) => {
  await axios.get(url + String(matchId));
};

export const getMatchesBySearch = async (search: string) =>
  await axios.get(url + `search?search=${search}`);
