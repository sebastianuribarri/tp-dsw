import UserUseCases from "../application/user.use_cases.js";
import { Response, Request } from "express";
import User from "../domain/user.entity.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Team from "../../Team/domain/team.entity.js";

export default class UserController {
  constructor(private userUseCases: UserUseCases) {
    this.getOne = this.getOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  public async getOne(req: Request, res: Response) {
    try {
      const user = await this.userUseCases.getUser(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const user = new User({
        mail: req.body.mail,
        password: req.body.password,
        username: req.body.username,
      });

      await this.userUseCases.register(user);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const { user, token } = await this.userUseCases.login(username, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  public async deleteOne(req: Request, res: Response) {
    try {
      await this.userUseCases.deleteUser(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  public async followTeam(req: Request, res: Response) {
    try {
      // Asegurarnos de pasar los parámetros correctamente
      await this.userUseCases.followTeam(
        req.body.id, // id del usuario
        req.body.teamId // id del equipo
      );
      res.status(200).json({ message: "Team followed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  public async unfollowTeam(req: Request, res: Response) {
    try {
      // Pasar los parámetros correctamente con req.query
      await this.userUseCases.unfollowTeam(
        req.query.id as string, // id del usuario
        Number(req.query.teamId) // Convertir teamId de string a número
      );
      res.status(200).json({ message: "Team unfollowed successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

