import standingModel from "./standing.schema.js";
import Standing from "../domain/standing.entity.js";
import IStandingRepository from "../domain/standing.repository.js";
import Competition from "../../Competition/domain/competiton.entity.js";
import Team from "../../Team/domain/team.entity.js";

export default class StandingMongoRepository implements IStandingRepository {
  public async findMany(filters: any): Promise<Standing[] | null> {
    try {
      const mongoStandings = await standingModel.find();
      return mongoStandings.map((elem) => {
        return new Standing({
          competition: new Competition({
            id: elem.competition.id,
            start: elem.competition.start,
            end: elem.competition.end,
            name: elem.competition.name,
            type: elem.competition.type,
            logo: elem.competition.logo,
          }),
          team: new Team({
            id: elem.team.id,
            name: elem.team.name,
            logo: elem.team.logo,
          }),
          points: elem.points,
          goalsDiff: elem.goalsDiff,
          group: elem.group,
          description: elem.description,
        });
      });
    } catch (err) {}
  }
  public async insertMany(standings: Standing[]): Promise<void> {
    console.log(standings.length);
    await standingModel.insertMany(standings);
  }
  public async updateOne(standing: Standing): Promise<void> {
    //  return await standingModel.findOneAndUpdate({ competition: competitionId, team.id: teamID }, standing, {
    // new: true,
  }
  public async deleteMany(filters: { competition: number }) {
    await standingModel.deleteMany({ competition: filters.competition });
  }
}
