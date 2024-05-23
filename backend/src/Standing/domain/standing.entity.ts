export default class Standing {
    competition: number;
    team: {
        id: number;
        name: string;
        logo:  string;
    }
    points: number;
    goalsDiff: number;
    group: string;
    description: string;
    
    constructor (standing: {competition; team; points; goalsDiff; group; description}) {
        this.competition = standing.competition;
        this.team = standing.team;
        this.points = standing.points;
        this.goalsDiff = standing.goalsDiff;
        this.group = standing.group;
        this.description = standing.description;
    }
}

