const url = "http://localhost:5000/api/teams/";

export const getTeamById = async (id: number) => await fetch(url + String(id));

export const getTeams = async () => await fetch(url);
