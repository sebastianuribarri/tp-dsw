import { NumericType } from "mongodb";
import Standing from "./standing.entity.ts";

export default interface IStandingRepository {
  findOne(filters: JSON): Promise<Standing | null>;
  findMany(filters: object): Promise<Standing[] | null>;
  insertMany(standing: Standing[]): Promise<void>;
  updateOne(standing: Standing): Promise<void>;
  deleteMany(filters: object): Promise<void>;
}
