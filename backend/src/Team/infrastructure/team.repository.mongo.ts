import ITeamRepository from "../domain/team.repository.js";
import TeamModel from "./team.schema.js";
import Team, { TeamDetail } from "../domain/team.entity.js";
import Player from "../../Player/domain/player.entity.js";
import Timmer from "../../Shared/domain/timmer.js";

export default class TeamMongoRepository implements ITeamRepository {
  public async findAll(): Promise<TeamDetail[] | null> {
    try {
      const mongoTeams = await TeamModel.find();
      return mongoTeams.map((elem) => {
        return new TeamDetail(
          {
            id: elem.id,
            name: elem.name,
            logo: elem.logo,
            playersTimmer: new Timmer(elem.playersTimmer),
          },
          elem.players
        );
      });
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async findById(id: number): Promise<TeamDetail | null> {
    const team = await TeamModel.findOne({ id: id });
    if (!team) return null;
    const players = team.players.map((player) => new Player(player));
    return new TeamDetail(
      {
        id: team.id,
        name: team.name,
        logo: team.logo,
        playersTimmer: new Timmer(team.playersTimmer),
      },
      players
    );
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
