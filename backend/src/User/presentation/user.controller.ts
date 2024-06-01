import UserUseCases from "../application/user.use_cases.js";
import { Response, Request } from "express";
import User from "../domain/user.entity.js";

export default class UserController {
  constructor(private userUseCases: UserUseCases) {
    this.getOne = this.getOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.createOne = this.createOne.bind(this);
    this.userUseCases = userUseCases;
  }

  public async getOne(req: Request, res: Response) {
    const result = await this.userUseCases.getUser(req.params.mail);
    res.json(result);
  }

  public async createOne(req: Request, res: Response) {
    const user = new User({
      mail: req.query.mail as string,
      password: req.query.password as string,
    });
    await this.userUseCases.createUser(user);
    res.status(200).json();
  }
  public async deleteOne(req: Request, res: Response) {
    await this.userUseCases.deleteUser(req.params.mail);
    res.status(200).json();
  }
}
