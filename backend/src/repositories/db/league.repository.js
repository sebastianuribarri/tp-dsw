export class LeagueMongoRepository {
    async getAll() {
        try {
            const leagues = [
                {
                    id: 1070,
                    name: "Copa de la liga",
                },
            ];
            return leagues;
        }
        catch (err) {
            console.log("ocurrio un error");
        }
    }
}
//# sourceMappingURL=league.repository.js.map