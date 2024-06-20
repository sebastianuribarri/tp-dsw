import ITeamRepository from "../domain/team.repository.js";
import TeamModel from "./team.schema.js";
import Team from "../domain/team.entity.js";

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
    return TeamModel.findOne({ id: id });
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
