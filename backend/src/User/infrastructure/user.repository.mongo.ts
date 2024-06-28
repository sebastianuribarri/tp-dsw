import { mongo } from "mongoose";
import User from "../domain/user.entity.js";
import { IUserRepository } from "../domain/user.repository.js";
import UserModel from "./user.schema.js";

export default class UserMongoRepository implements IUserRepository {
  public async findAll(): Promise<User[] | null> {
    try {
      const mongoUsers = await UserModel.find();
      return mongoUsers.map((elem) => {
        return new User({
          mail: elem.mail,
          password: elem.password,
          premium: elem.premium,
          username: elem.username,
          id: elem.id,
          teams: elem.teams,
        });
      });
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async findByMail(mail: string): Promise<User | null> {
    try {
      const mongoUser = await UserModel.findOne({ mail: mail });
      return new User({
        mail: mongoUser.mail,
        password: mongoUser.password,
        premium: mongoUser.premium,
        username: mongoUser.username,
        id: mongoUser.id,
        teams: mongoUser.teams,
      });
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async insertOne(user: User): Promise<void> {
    await UserModel.create(user);
  }

  public async updateOne(
    mail: string,
    newData: { password?: string; premium?: boolean }
  ): Promise<void> {
    await UserModel.findOneAndUpdate({ mail: mail }, newData, {
      new: true,
    });
  }
  public async deleteOne(mail: string) {
    await UserModel.deleteOne({ mail: mail });
  }
}
