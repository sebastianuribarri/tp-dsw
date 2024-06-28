import Timmer from "../../Shared/domain/timmer.js";
import Player from "./player.entity.js";

export default class Team {
  readonly id: number;
  readonly name: string;
  readonly logo: string;
  playersTimmer: Timmer;

  private static readonly playersTimmerInMinutes = 2 * 24 * 60;

  constructor(team: {
    id: number;
    name: string;
    logo: string;
    playersTimmer?: { lastUpdate: Date; active: boolean };
  }) {
    this.id = team.id;
    this.name = team.name;
    this.logo = team.logo;
    this.playersTimmer = team.playersTimmer
      ? new Timmer(team.playersTimmer)
      : new Timmer();
  }

  public playersUpdated() {
    return this.playersTimmer.isUpdated(Team.playersTimmerInMinutes);
  }
}

export class TeamDetail extends Team {
  players: Player[];

  constructor(
    team: {
      id: number;
      name: string;
      logo: string;
      playersTimmer?: { lastUpdate: Date; active: boolean };
    },
    players: Player[]
  ) {
    super(team);
    this.players = players;
  }
}
