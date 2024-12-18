import Competition from "../../Competition/domain/competition.entity.js";
import TeamUseCases from "../../Team/application/team.use_cases.js";
import TeamMongoRepository from "../../Team/infrastructure/team.repository.mongo.js";
import User from "../domain/user.entity.js";
import { IUserRepository } from "../domain/user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const teamSchema = {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
};

export default class UserUseCases {
  private userDbRepository: IUserRepository;

  public constructor(
    userDbRepository: IUserRepository,
    private readonly teamDbRepository: TeamMongoRepository
  ) {
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

  public async updateSubscription(id: string) {
    const user = await this.getUser(id);
    console.log("suscription actual", user.premium);
    const newSubscriptionStatus = !user.premium;
    return await this.userDbRepository.updateOne(id, {
      premium: newSubscriptionStatus,
    });
  }

  public async register(user: User) {
    // Chequea que el username no exista
    const existingUser = await this.userDbRepository.findByUsername(
      user.username
    );
    if (existingUser) {
      throw new Error("Nombre de usuario ya registrado");
    }
    const existingMail = await this.userDbRepository.findByMail(user.mail);
    if (existingMail) {
      throw new Error("Email ya registrado");
    }

    // Hash the password and proceed with registration
    user.password = await bcrypt.hash(user.password, 10);
    await this.userDbRepository.insertOne(user);
  }

  public async deleteUser(id: string) {
    return await this.userDbRepository.deleteOne(id);
  }

  public async login(username: string, password: string) {
    const user = await this.userDbRepository.findByUsername(username);
    if (!user) throw new Error("Usuario no encontrado");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Usuario o contraseña incorrectos");

    const token = jwt.sign(
      { id: user.id, premium: user.premium },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return { user, token };
  }

  public async followTeam(id: string, teamId: number) {
    const user = await this.getUser(id);
    const dbTeam = await this.teamDbRepository.findById(teamId);
    if (!user.teams.some((team) => team.id === dbTeam.id)) {
      user.teams.push({ id: dbTeam.id, name: dbTeam.name, logo: dbTeam.logo });

      await this.userDbRepository.updateOne(id, { teams: user.teams });
    }
  }

  public async unfollowTeam(id: string, teamId: number) {
    const user = await this.getUser(id);
    user.teams = user.teams.filter((team) => team.id !== teamId);
    await this.userDbRepository.updateOne(id, { teams: user.teams });
  }
}
