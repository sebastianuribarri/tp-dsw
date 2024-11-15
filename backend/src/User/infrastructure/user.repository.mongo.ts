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
          id: elem.id, // Se usa el campo `id` del esquema
          teams: elem.teams,
        })
    );
  }

  public async findById(id: string): Promise<User | null> {
    const mongoUser = await UserModel.findOne({ id }); // Búsqueda por `id`
    return mongoUser
      ? new User({
          mail: mongoUser.mail,
          password: mongoUser.password,
          premium: mongoUser.premium,
          username: mongoUser.username,
          id: mongoUser.id,
          teams: mongoUser.teams,
        })
      : null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const mongoUser = await UserModel.findOne({ username });
    return mongoUser
      ? new User({
          mail: mongoUser.mail,
          password: mongoUser.password,
          premium: mongoUser.premium,
          username: mongoUser.username,
          id: mongoUser.id,
          teams: mongoUser.teams,
        })
      : null;
  }

  public async insertOne(user: User): Promise<User> {
    const mongoUser = await UserModel.create({
      mail: user.mail,
      password: user.password,
      premium: user.premium,
      username: user.username,
      id: user.id,
      teams: user.teams,
    });
    return new User({
      mail: mongoUser.mail,
      password: mongoUser.password,
      premium: mongoUser.premium,
      username: mongoUser.username,
      id: mongoUser.id,
      teams: mongoUser.teams,
    });
  }

  public async updateOne(id: string, newData: Partial<User>): Promise<void> {
    await UserModel.findOneAndUpdate({ id }, newData);
  }

  public async deleteOne(id: string): Promise<void> {
    await UserModel.findOneAndDelete({ id });
  }
}
