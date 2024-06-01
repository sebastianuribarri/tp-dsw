import Standing from "../domain/standing.entity.js";

export default class StandingMongoRepository {
  public async findMany(filters: any): Promise<Standing[] | null> {
    return;
  }
  public async insertMany(standing: Standing[]) {}
  public async updateMany(filters: any, newdata: any) {}
  public async deleteMany(filters: any) {}
}
