import ITeamRepository from "../domain/team.repository.js";
import TeamModel from "./team.schema.js";
import Team, { TeamDetail } from "../domain/team.entity.js";
import Player from "../domain/player.entity.js";

export default class TeamMongoRepository implements ITeamRepository {
  public async findAll(): Promise<Team[] | null> {
    try {
      const mongoTeams = await TeamModel.find();
      return mongoTeams.map((elem) => {
        return new Team({
          id: elem.id,
          name: elem.name,
          logo: elem.logo,
        });
      });
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async findById(id: number): Promise<Team | null> {
    const team = await TeamModel.findOne({ id: id });
    const players = team.players.map((player) => new Player(player))
    return new TeamDetail({
      id: team.id,
      name: team.name,
      logo: team.logo,
    }, players)
  }

  public async insertOne(team: Team): Promise<void> {
    await TeamModel.create(team);
  }
  public async updateOne(id: number, newData: Team): Promise<Team | null> {
    return await TeamModel.findOneAndUpdate({ id: id }, newData, {
      new: true,
    });
  }
}
