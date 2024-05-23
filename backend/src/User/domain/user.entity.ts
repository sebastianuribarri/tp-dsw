export default class User {
    mail: string;
    password: string;
    premium: boolean;

    constructor(user: { mail; password }) {
        this.mail = user.mail;
        this.password = user.password;
        this.premium = false;
    }
}
