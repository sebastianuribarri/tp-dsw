import User from "../domain/user.entity.js";
import { IUserRepository } from "../domain/user.repository.js";
import UserModel from "./user.schema.js";

export default class UserMongoRepository implements IUserRepository {
  public async findAll(): Promise<User[]> {
    const mongoUsers = await UserModel.find();
    return mongoUsers.map(
      (elem) =>
        new User({
          mail: elem.mail,
          password: elem.password,
          premium: elem.premium,
          username: elem.username,
          id: String(elem._id),
          teams: elem.teams,
        })
    );
  }

  public async findById(id: string): Promise<User | null> {
    const mongoUser = await UserModel.findById(id);
    return mongoUser
      ? new User({
          mail: mongoUser.mail,
          password: mongoUser.password,
          premium: mongoUser.premium,
          username: mongoUser.username,
          id: String(mongoUser._id),
          teams: mongoUser.teams,
        })
      : null;
  }

  public async findByMail(mail: string): Promise<User | null> {
    const mongoUser = await UserModel.findOne({ mail });
    return mongoUser
      ? new User({
          mail: mongoUser.mail,
          password: mongoUser.password,
          premium: mongoUser.premium,
          username: mongoUser.username,
          id: String(mongoUser._id),
          teams: mongoUser.teams,
        })
      : null;
  }

  public async insertOne(user: User): Promise<User> {
    const mongoUser = await UserModel.create(user);
    return new User({
      mail: mongoUser.mail,
      password: mongoUser.password,
      premium: mongoUser.premium,
      username: mongoUser.username,
      id: String(mongoUser._id),
      teams: mongoUser.teams,
    });
  }

  public async updateOne(id: string, newData: Partial<User>): Promise<void> {
    await UserModel.findByIdAndUpdate(id, newData);
  }

  public async deleteOne(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}
