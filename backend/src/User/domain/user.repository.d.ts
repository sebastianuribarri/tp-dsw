import User from "./user.entity.ts";

export interface IUserRepository {
  findAll(): Promise<User[] | null>;
  findByMail(mail: string): Promise<User | null>;
  insertOne(user: User): Promise<void>;
  updateOne(
    mail: string,
    newData: { password?: string; premium?: boolean; teams?:number[] }
  ): Promise<void>;
  deleteOne(mail: string): Promise<void>;
}
