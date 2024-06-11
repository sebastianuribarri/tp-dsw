export default class Team {
    readonly id: number;
    readonly name: string;
    readonly logo: string;
    constructor(team: {
      id: number;
      name: string;
      logo: string;
    }) {
      this.id = team.id;
      this.name = team.name;
      this.logo = team.logo;
    }
  
  }
  