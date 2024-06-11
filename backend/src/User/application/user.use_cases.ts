import Competition from "../../Competition/domain/competiton.entity.js";
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
  public async followTeam(mail:string, idcompetition: number){
    let user = await this.userDbRepository.findByMail (mail);
    user.teams.push(idcompetition)
    await this.userDbRepository.updateOne(mail,{teams:user.teams} )
  }
  public async unfollowTeam(mail:string, idcompetition: number){
    let user = await this.userDbRepository.findByMail(mail);
    for (var i = 0; i < user.teams.length; i++) {
      if (idcompetition == user.teams[i]) {
        user.teams.splice(i,1);
      }
    await this. userDbRepository.updateOne(mail,{teams:user.teams})
    }
  }
}
