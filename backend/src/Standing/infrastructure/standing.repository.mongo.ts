import standingModel from "./standing.schema.js";
import Standing from "../domain/standing.entity.js";
import IStandingRepository from "../domain/standing.repository.js";

export default class StandingMongoRepository
  implements IStandingRepository
{
  public async findMany(filters: any): Promise<Standing[] | null> {
    try {
        const mongoStandings = await standingModel.find();
        return mongoStandings.map((elem) => {
            return new Standing({
                competition: elem.competition,
                team: {id: elem.team.id, name: elem.team.name, logo: elem.team.logo},
                points: elem.points,
                goalsDiff: elem.goalsDiff,
                group: elem.group,
                description: elem.description,
            });
        } 
        );
    }
  }
  public async insertMany(standing: Standing[]): Promise<void> {
        await standingModel.create(standing);
  }
  public async updateOne(competitionId: number, teamID: number, standing: Standing): Promise<void> {
     //  return await standingModel.findOneAndUpdate({ competition: competitionId, team.id: teamID }, standing, {
     // new: true,
  }
  public async deleteMany(filters: {competition: number}) {
      await standingModel.deleteMany({competition: filters.competition });
  }
}
