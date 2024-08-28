import Team from "../../Team/domain/team.entity.js";

export default class Event {
  time: number;
  team: Team;
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

  constructor (event:{
    time: number;
    team: Team;
    player: {
      id: number | null;
      name: string | null;
    };
    assist: {
      id: number | null;
      name: string | null;
    }
    type: string;
    detail: string;
  }) {
    this.time= event.time
    this.team = event.team
    this.player = event.player
    this.assist = event.assist
    this.type = event.type
    this.detail = event.detail
  }
}
