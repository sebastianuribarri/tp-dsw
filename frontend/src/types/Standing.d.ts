import Team from "./Team";

export default interface Standing {
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  description: string;
}
