import Team from "./team.entity.ts";

export default interface ITeamRepository {
  findAll(): Promise<Team[] | null>;
  findById(id: number): Promise<Team | null>;
  insertOne(team: Team): Promise<Team | void>;
  updateOne(id: number, newData: Team): Promise<Team | null>;
}
