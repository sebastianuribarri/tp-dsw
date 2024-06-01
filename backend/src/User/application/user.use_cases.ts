import User from "../domain/user.entity.js";
import { IUserRepository } from "../domain/user.repository.js";

export default class UserUseCases {
  private userDbRepository: IUserRepository;

  public constructor(userDbRepository: IUserRepository) {
    this.userDbRepository = userDbRepository;
  }

  public async getUser(mail: string) {
    const user = await this.userDbRepository.findByMail(mail);
    return user;
  }
  public async updatePassword(mail: string, newPassword: string) {
    return await this.userDbRepository.updateOne(mail, {
      password: newPassword,
    });
  }
  public async updateSuscription(
    mail: string,
    actualSuscriptionStatus: boolean
  ) {
    const newSuscriptionStatus = !actualSuscriptionStatus;
    return await this.userDbRepository.updateOne(mail, {
      premium: newSuscriptionStatus,
    });
  }
  public async createUser(user: User) {
    await this.userDbRepository.insertOne(user);
  }
  public async deleteUser(mail: string) {
    return await this.userDbRepository.deleteOne(mail);
  }
}
