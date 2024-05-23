import UserUseCases from "../application/user.use_cases.js";
import { Response, Request } from "express";
import User from "../domain/user.entity.js";

export default class UserController {

constructor ( private userUseCases: UserUseCases) {
    this.getOne = this.getOne.bind(this);
    this.createOne = this.createOne.bind(this)
    this.userUseCases = userUseCases;
}

  public async getOne(req: Request, res: Response) {
    const result = await this.userUseCases.getUser(
      req.params.mail
    );
    res.json(result);
  }

  public async createOne(req: Request, res: Response){
    const user = new User({
        mail: req.query.mail,
        password: req.query.password,
        premium: req.query.premium
    })
    console.log (user, req.params, req.query)
    await this.userUseCases.createUser (user)
    res.status(200)
  }
}