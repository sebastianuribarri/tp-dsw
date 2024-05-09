export class LeagueService {
    constructor(leagueMongoRepository) {
        this.leagueMongoRepository = leagueMongoRepository;
        this.mongoRepository = leagueMongoRepository;
    }
    async getAll() {
        try {
            const leagues = await this.mongoRepository.getAll();
            return leagues;
        }
        catch (err) {
            console.log("ocurrio un error");
        }
    }
}
//# sourceMappingURL=league.service.js.map