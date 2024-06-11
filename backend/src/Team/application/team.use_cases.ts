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

  private async getNewTeamsData() {
    const apiTeams = await this.teamApiRepository.findAll({
      country: "Argentina",
    });
    let dbTeams = await this.teamDbRepository.findAll();

    if (apiTeams && dbTeams) {
      // apiTeams loop
      apiTeams.forEach((apiTeam) => {
        let founded = false;
        // dbTeams loop
        dbTeams.forEach((dbTeam, i) => {
          if (dbTeam.id === apiTeam.id) {
            if (apiTeam != dbTeam) {
              this.updateTeam(dbTeam.id, apiTeam);
            }
            dbTeams.splice(i, 1);
            founded = true;
          }
        });

        if (!founded) {
          this.createTeam(apiTeam);
        }
      });
      this.teamsTimmer.setUpdate();
      return apiTeams;
    }
  }

  public async listAll() {
    const updated = this.teamsTimmer.updated;
    if (updated) {
      return await this.teamDbRepository.findAll();
    } else {
      return await this.getNewTeamsData();
    }
  }

  public async getTeam(id: number) {
    const teamsUpdated = this.teamsTimmer.updated;
    let team: Team | null;
    if (teamsUpdated) {
      // si las Teams estan actualizadas
      team = await this.teamDbRepository.findById(id);
    } else {
      // sino, actualizar el listado
      const updatedTeams = await this.getNewTeamsData();
      team = updatedTeams.find((comp) => comp.id === id);
    }
    return team;
  }

  public async createTeam(team: Team) {
    return await this.teamDbRepository.insertOne(team);
  }

  public async updateTeam(
    teamId: number,
    newTeamData: Team
  ) {
    return await this.teamDbRepository.updateOne(
      teamId,
      newTeamData
    );
  }
}
