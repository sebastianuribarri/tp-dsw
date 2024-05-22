export class LeagueController {
    constructor(leagueService) {
        this.leagueService = leagueService;
        this.service = leagueService;
    }
    async getAll() {
        try {
            const leagues = await this.service.getAll();
        }
        catch (err) {
            console.log("ocurrio un error");
        }
    }
}
//# sourceMappingURL=league.controller.js.map