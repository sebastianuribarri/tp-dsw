import User from "./user.entity.ts";

export interface IUserRepository {
  findAll(): Promise<User[] | null>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByMail(mail: string): Promise<User | null>;
  insertOne(user: User): Promise<User>;
  updateOne(
    mail: string,
    newData: { password?: string; premium?: boolean; teams?: {id: number; name: string ; logo: string }[] }
  ): Promise<void>;
  deleteOne(mail: string): Promise<void>;
}
