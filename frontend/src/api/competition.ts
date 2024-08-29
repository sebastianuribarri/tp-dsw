const url = "http://localhost:5000/api/competitions/";

export const getCompetitionsByTeam = async (teamId: number) =>
  await fetch(url + "team/" + String(teamId));
