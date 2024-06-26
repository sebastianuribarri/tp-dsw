import StandingModel from "./standing.schema.js";
import Standing from "../domain/standing.entity.js";
import IStandingRepository from "../domain/standing.repository.js";
import Competition from "../../Competition/domain/competiton.entity.js";
import Team from "../../Team/domain/team.entity.js";

export default class StandingMongoRepository implements IStandingRepository {
  public async findOne(filters: object): Promise<Standing | null> {
    try {
      const standing = await StandingModel.findOne(filters);
      console.log("standing desde repo:", standing);
      return new Standing({
        competition: standing.competition,
        team: standing.team,
        points: standing.points,
        goalsDiff: standing.goalsDiff,
        group: standing.group,
        description: standing.description,
      });
    } catch (err) {}
  }
  public async findMany(filters: JSON): Promise<Standing[] | null> {
    try {
      const query = StandingModel.find();
      const mongoStandings = await StandingModel.find(filters);
      console.log(mongoStandings);
      return mongoStandings.map((standing) => {
        return new Standing({
          competition: standing.competition,
          team: standing.team,
          points: standing.points,
          goalsDiff: standing.goalsDiff,
          group: standing.group,
          description: standing.description,
        });
      });
    } catch (err) {}
  }
  public async insertMany(standings: Standing[]): Promise<void> {
    await StandingModel.insertMany(standings);
  }
  public async updateOne(standing: Standing): Promise<void> {
    return await StandingModel.findOneAndUpdate(
      {
        competition: { id: standing.competition.id },
        team: { id: standing.team.id },
      },
      standing,
      {
        new: true,
      }
    );
  }
  public async deleteMany(filters: { competition: Competition }) {
    await StandingModel.deleteMany({ competition: filters.competition });
  }
}
