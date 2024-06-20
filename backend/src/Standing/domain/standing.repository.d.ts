import { NumericType } from "mongodb";
import Standing from "./standing.entity.ts";

export default interface IStandingRepository {
  findMany(filters: object): Promise<Standing[] | null>;
  insertMany(standing: Standing[]): Promise<void>;
  updateOne(standing: Standing): Promise<void>;
  deleteMany(filters: object): Promise<void>;
}
