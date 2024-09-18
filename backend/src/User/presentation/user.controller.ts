import UserUseCases from "../application/user.use_cases.js";
import { Response, Request } from "express";
import User from "../domain/user.entity.js";
import bcrypt from "bcryptjs";

export default class UserController {
  constructor(private userUseCases: UserUseCases) {
    this.getOne = this.getOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.register = this.register.bind(this);
    this.userUseCases = userUseCases;
  }

  public async getOne(req: Request, res: Response) {
    const result = await this.userUseCases.getUser(req.params.mail);
    res.json(result);
  }

  public async register(req: Request, res: Response) {
    try {
      const passwordhash = await bcrypt.hash(req.body.password, 10)
      const user = new User({
        mail: req.body.mail as string,
        password: passwordhash,
        username: req.body.username as string,
      });
      
      await this.userUseCases.register(user);
      res.status(200).json();
    } catch (error) {
      console.log(error);
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userFound = await this.userUseCases.getUser(email);
      res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.mail,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async deleteOne(req: Request, res: Response) {
    await this.userUseCases.deleteUser(req.params.mail);
    res.status(200).json();
  }
  public async followTeam(req: Request, res: Response) {
    await this.userUseCases.followTeam(
      req.params.mail,
      Number(req.params.team)
    );
    res.status(200).json();
  }
  public async unfollowTeam(req: Request, res: Response) {
    await this.userUseCases.followTeam(
      req.params.mail,
      Number(req.params.team)
    );
    res.status(200).json();
  }
}
