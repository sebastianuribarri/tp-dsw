import Competition from "../../Competition/domain/competiton.entity.js";
import Timmer from "../../Shared/domain/timmer.js";

export default class CompetitionStandingsTimmer extends Timmer {
  private static readonly timmerInMinutes = 1 * 0.5; // 1 hour
  private static timmers: CompetitionStandingsTimmer[] = [];

  private readonly competitionId: number;
  private readonly competitionSeason: number;
  private readonly competitionEnd: Date;

  constructor(competition: Competition) {
    super();
    this.competitionId = competition.id;
    this.competitionSeason = competition.season;
    this.competitionEnd = competition.end;
  }

  public static createTimmer(competition: Competition) {
    const timmerFounded = this.timmers.find(
      (timmer) =>
        timmer.competitionId === competition.id &&
        timmer.competitionSeason === competition.season
    );

    if (timmerFounded) return timmerFounded;

    let newTimmer = new CompetitionStandingsTimmer(competition);
    this.timmers.push(newTimmer);
    return newTimmer;
  }

  public static seachTimmer(competitionId: number, competitionSeason: number) {
    return CompetitionStandingsTimmer.timmers.find(
      (timmer) =>
        timmer.competitionId === competitionId &&
        timmer.competitionSeason === competitionSeason
    );
  }

  public static deleteTimmer(competitionId: number, competitionSeason: number) {
    CompetitionStandingsTimmer.timmers.forEach((timmer, i) => {
      if (
        timmer.competitionId === competitionId &&
        timmer.competitionSeason === competitionSeason
      ) {
        CompetitionStandingsTimmer.timmers.splice(i, 1);
      }
    });
  }
  public static isUpdated(competitionId: number, competitionSeason: number) {
    let timmer = CompetitionStandingsTimmer.seachTimmer(
      competitionId,
      competitionSeason
    );

    // delete timmer if the competition finished one or more days ago
    // standings doesnt need more updates
    const now = new Date();
    const differenceInDays =
      (now.getTime() - timmer.competitionEnd.getTime()) / (1000 * 60 * 24);
    if (differenceInDays >= 1)
      CompetitionStandingsTimmer.deleteTimmer(competitionId, competitionSeason);

    // if the competition is not founded, is because it ends, standings not need update
    if (!(timmer instanceof CompetitionStandingsTimmer)) {
      return true;
    }

    // if the competition is active, check if it need to update standings
    return timmer.isUpdated(CompetitionStandingsTimmer.timmerInMinutes);
  }

  public static setUpdate(competitionId: number, competitionSeason: number) {
    const timmer = CompetitionStandingsTimmer.seachTimmer(
      competitionId,
      competitionSeason
    );

    if (!(timmer instanceof CompetitionStandingsTimmer)) {
      return;
    }

    return timmer.setUpdate();
  }

  public static existUpdate(competitionId: number, competitionSeason: number) {
    let timmer = CompetitionStandingsTimmer.seachTimmer(
      competitionId,
      competitionSeason
    );

    console.log(!(timmer instanceof CompetitionStandingsTimmer), timmer);
    // if the timmer does not exist, is because the competition finished, update has existed
    if (!(timmer instanceof CompetitionStandingsTimmer)) return true;

    // if there is not updates, return false
    if (typeof timmer.lastUpdate === "undefined") return false;

    // instead, returns true
    return true;
  }
}
