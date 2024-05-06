import { League } from "../../interfaces/league.interface.js";

export const leagueFormatter = (res: any): [League] => {
  return res.response.map((elem: any) => elem.league);
};
