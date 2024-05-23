import Standing from "../domain/standing.entity.js";

export default class StandingMongoRepository {
public async findByCompetition(competition: number) {
}
public async findByTeam(id: number ) {}
public async insertOne(standing: Standing) {}

public async updateMany(filters: any, newdata: any) {}
public async deleteMany(filters: any) {}

}
