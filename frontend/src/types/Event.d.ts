import Team from "./Team";

interface Event {
  team: Team;
  player: {
    id: number;
    name: string;
  };
  assist?: {
    id: number;
    name: string;
  };
  type: string;
  detail: string;
}

export default Event;
