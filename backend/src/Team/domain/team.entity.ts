import Timmer, { TimmerInput } from "../../Shared/domain/timmer.js";
import Player from "../../Player/domain/player.entity.js";
import TeamPlayersTimmer from "../../Player/domain/player.timmer.js";

export default class Team {
  readonly id: number;
  readonly name: string;
  readonly logo: string;
  playersTimmer: TeamPlayersTimmer;

  private static readonly playersTimmerInMinutes = 20 * 24 * 60; // 20 dias

  constructor(team: {
    id: number;
    name: string;
    logo: string;
    playersTimmer?: TimmerInput;
  }) {
    this.id = team.id;
    this.name = team.name;
    this.logo = team.logo;
    this.playersTimmer = team.playersTimmer
      ? new TeamPlayersTimmer(team.playersTimmer)
      : new TeamPlayersTimmer();
  }
}

export class TeamDetail extends Team {
  players: Player[];

  constructor(
    team: {
      id: number;
      name: string;
      logo: string;
      playersTimmer?: TimmerInput;
    },
    players: Player[]
  ) {
    super(team);
    this.players = players;
  }
}
