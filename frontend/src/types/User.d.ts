import Team from "./Team";

export interface User {
  username: string;
  mail: string;
  password: string;
  id: string;
  premium: boolean;
  teams: Team[];
}
