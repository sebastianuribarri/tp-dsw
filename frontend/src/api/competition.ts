export const getCompetitionsByTeam = async (teamId: number) =>
  await fetch(url + "team/" + String(teamId));

export const getCompetitionById = async (id: number) =>
  await fetch(url + String(id));
