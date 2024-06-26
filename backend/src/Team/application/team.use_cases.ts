import IApiRepository from "../../Shared/domain/api.repository.js";
import ITeamRepository from "../domain/team.repository.js";
import TeamsTimmer from "../domain/team.timmer.js";
import Team from "../domain/team.entity.js";

export default class TeamUseCases {
  private readonly teamsTimmer: TeamsTimmer;
  public constructor(
    private readonly teamApiRepository: IApiRepository<Team>,
    private readonly teamDbRepository: ITeamRepository
  ) {
    this.teamsTimmer = new TeamsTimmer();
  }

  public async listAll() {
    const newData = await this.needUpdate();
    if (newData) return newData;
    return await this.teamDbRepository.findAll();
  }

  public async getTeam(id: number) {
    const newData = await this.needUpdate();
    if (newData) return newData.find((team) => team.id === id);
    return await this.teamDbRepository.findById(id);
  }

  private async needUpdate() {
    if (this.teamsTimmer.updated) return false;
    const apiTeams = await this.teamApiRepository.findAll({
      country: "Argentina",
    });
    const result = await this.updateTeams(apiTeams);
    if (result) this.teamsTimmer.setUpdate();
    return apiTeams;
  }

  private async updateTeams(apiTeams: Team[]) {
    let dbTeams = await this.teamDbRepository.findAll();

    if (!(apiTeams && dbTeams)) return false;

    // apiTeams loop
    for (let apiTeam of apiTeams) {
      let founded = false;
      // dbTeams loop
      dbTeams.forEach((dbTeam, i) => {
        if (dbTeam.id === apiTeam.id) {
          if (apiTeam != dbTeam) this.updateTeam(dbTeam.id, apiTeam);
          dbTeams.splice(i, 1);
          founded = true;
        }
      });
      if (!founded) this.createTeam(apiTeam);
    }
    return true;
  }

  private async updateTeam(teamId: number, newTeamData: Team) {
    return await this.teamDbRepository.updateOne(teamId, newTeamData);
  }

  private async createTeam(team: Team) {
    return await this.teamDbRepository.insertOne(team);
  }
}
