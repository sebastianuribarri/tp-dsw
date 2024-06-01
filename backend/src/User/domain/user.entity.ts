export default class User {
  mail: string;
  password: string;
  premium: boolean;

  constructor(user: { mail: string; password: string; premium?: boolean }) {
    this.mail = user.mail;
    this.password = user.password;
    this.premium = user.premium ? user.premium : false;
  }
}
