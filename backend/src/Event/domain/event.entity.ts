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
}
