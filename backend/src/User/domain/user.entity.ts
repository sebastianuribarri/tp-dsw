export default class User {
  mail: string;
  password: string;
  premium: boolean;
  teams: number[]
  constructor(user: { mail: string; password: string; premium?: boolean; teams?: number[]}) {
    this.mail = user.mail;
    this.password = user.password;
    this.premium = user.premium ? user.premium : false;
    this.teams = user.teams ? user.teams : [];
  }
}
