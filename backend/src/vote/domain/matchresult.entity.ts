export class MatchResult  {
    player: number;
    amount: number;

    constructor(matchresult: {
        player: number;
        amount: number;
    } ) {
        this.player = matchresult.player;
        this.amount = matchresult.amount;
}
}