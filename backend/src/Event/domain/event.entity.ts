import Team, { TeamInput } from "../../Team/domain/team.entity.js";

export interface EventInput {
  time: number;
  team: TeamInput;
  player: {
    id: number | null;
    name: string | null;
  };
  assist: {
    id: number | null;
    name: string | null;
  };
  type: string;
  detail: string;
}

export default class Event {
  time: number;
  team: TeamInput;
  player: {
    id: number;
    name: string;
  };
  assist: {
    id: number | null;
    name: string | null;
  };
  type: string;
  detail: string;

  constructor(event: EventInput) {
    this.time = event.time;
    this.team = event.team;
    this.player = event.player;
    this.assist = event.assist;
    this.type = event.type;
    this.detail = event.detail;
  }
}
