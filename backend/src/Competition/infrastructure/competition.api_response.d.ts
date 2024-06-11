export default interface ApiCompetition {
  league: {
    id: number;
    name: string;
    type: "League" | "Cup";
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: [
    {
      year: number;
      start: Date;
      end: Date;
      current: boolean;
      coverage: object;
    }
  ];
}
