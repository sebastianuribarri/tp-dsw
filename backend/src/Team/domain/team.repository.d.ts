import Team, { TeamDetail } from "./team.entity.ts";

export default interface ITeamRepository {
  findAll(filters?: object): Promise<Team[] | null>;
  findById(id: number): Promise<TeamDetail | null>;
  insertOne(team: Team): Promise<TeamDetail | void>;
  updateOne(id: number, newData: Team): Promise<void>;
}
