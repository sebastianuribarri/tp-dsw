import ITeamRepository from "../domain/team.repository.js";
import TeamModel from "./team.schema.js";
import Team, { TeamDetail } from "../domain/team.entity.js";
import Player from "../../Player/domain/player.entity.js";
import Timmer from "../../Shared/domain/timmer.js";

export default class TeamMongoRepository implements ITeamRepository {

  public async findAll(filters?: Record<string, any>): Promise<Team[] | null> {
    try {
      if (filters && filters.search) {
        const searchTerms = filters.search.toLowerCase().split(' ');
        const regexPattern = searchTerms.map(term => `(?=.*${term})`).join('');
        filters = { 
          name: { 
            $regex: regexPattern, 
            $options: 'i' 
          } 
        };
      }

      const mongoTeams = await TeamModel.find(filters).sort({ id: 1 });
      const uniqueTeams = mongoTeams.filter((team, index, array) => {
        return index === 0 || team.id !== array[index - 1].id;
      });
      
      return uniqueTeams.map((team) => {
        return new Team(team);
      });
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
      return null;
    }
  }

  public async findById(id: number): Promise<TeamDetail | null> {
    const team = await TeamModel.findOne({ id: id });
    if (!team) return null;
    return new TeamDetail(team, team.players);
  }

  public async insertOne(team: Team): Promise<void> {
    await TeamModel.create(team);
  }
  public async updateOne(id: number, newData: TeamDetail): Promise<void> {
    await TeamModel.findOneAndUpdate({ id: id }, newData, {
      new: true,
    });
  }
}
