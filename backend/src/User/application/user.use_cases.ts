import Competition from "../../Competition/domain/competition.entity.js";
import User from "../domain/user.entity.js";
import { IUserRepository } from "../domain/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class UserUseCases {
  private userDbRepository: IUserRepository;

  public constructor(userDbRepository: IUserRepository) {
    this.userDbRepository = userDbRepository;
  }

  public async getUser(id: string) {
    const user = await this.userDbRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  public async updatePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await this.userDbRepository.updateOne(id, {
      password: hashedPassword,
    });
  }

  public async updateSubscription(
    id: string,
    actualSubscriptionStatus: boolean
  ) {
    const newSubscriptionStatus = !actualSubscriptionStatus;
    return await this.userDbRepository.updateOne(id, {
      premium: newSubscriptionStatus,
    });
  }

  public async register(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    await this.userDbRepository.insertOne(user);
  }

  public async deleteUser(id: string) {
    return await this.userDbRepository.deleteOne(id);
  }

  public async login(mail: string, password: string) {
    const user = await this.userDbRepository.findByMail(mail);
    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Incorrect email or password");

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });
    return { user, token };
  }

  public async followTeam(id: string, competitionId: number) {
    const user = await this.getUser(id);
    if (!user.teams.includes(competitionId)) {
      user.teams.push(competitionId);
      await this.userDbRepository.updateOne(id, { teams: user.teams });
    }
  }

  public async unfollowTeam(id: string, competitionId: number) {
    const user = await this.getUser(id);
    user.teams = user.teams.filter((teamId) => teamId !== competitionId);
    await this.userDbRepository.updateOne(id, { teams: user.teams });
  }
}
