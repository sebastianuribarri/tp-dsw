import IApiRepository from "../../Shared/domain/api.repository.js";
import ITeamRepository from "../domain/team.repository.js";
import TeamsTimmer from "../domain/team.timmer.js";
import Team, { TeamDetail } from "../domain/team.entity.js";
import PlayerUseCases from "../../Player/application/player.use_cases.js";

export default class TeamUseCases {
  private readonly teamsTimmer: TeamsTimmer;
  public constructor(
    private readonly teamDbRepository: ITeamRepository,
    private readonly playerUseCases: PlayerUseCases
  ) {
    this.teamsTimmer = new TeamsTimmer();
  }

  public async listAll() {
    return await this.teamDbRepository.findAll();
  }

  public async getTeam(id: number) {
    let teamDetail = await this.teamDbRepository.findById(id);
    let newTeamPlayers = await this.playerUseCases.needUpdate(teamDetail);
    if (newTeamPlayers) {
      teamDetail.players = newTeamPlayers;
      await this.updateTeam(teamDetail.id, teamDetail);
    }
    return teamDetail;
  }

  public async updateTeam(teamId: number, newTeamData: Team) {
    await this.teamDbRepository.updateOne(teamId, newTeamData);
  }

  public async createTeam(team: Team) {
    const teamFounded = await this.teamDbRepository.findById(team.id);
    if (teamFounded) return team;
    return await this.teamDbRepository.insertOne(team);
  }
}
