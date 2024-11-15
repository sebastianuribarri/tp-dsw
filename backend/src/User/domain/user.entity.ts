import { v4 as uuidv4 } from "uuid";

export default class User {
  mail: string;
  password: string;
  premium: boolean;
  teams: number[];
  username: string;
  id: string;

  constructor(user: {
    mail: string;
    password: string;
    premium?: boolean;
    teams?: number[];
    username: string;
    id?: string;
  }) {
    this.mail = user.mail;
    this.password = user.password;
    this.username = user.username;
    this.id = user.id ? user.id : uuidv4();
    this.premium = user.premium ? user.premium : false;
    this.teams = user.teams ? user.teams : [];
  }
}
