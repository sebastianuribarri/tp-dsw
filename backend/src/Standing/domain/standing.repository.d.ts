import Standing from "./standing.entity.ts";

export default interface IStandingRepository {
  findMany(filters: object): Promise<Standing[] | null>;
  insertMany(standing: Standing[]): Promise<void>;
  updateMany(filters: object, newData: object): Promise<void>;
  deleteMany(filters: object): Promise<void>;
}
