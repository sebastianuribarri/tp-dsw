export const getMatches = async () =>
  await [
    {
      id: 1178351,
      date: "2024-09-20T00:00:00+00:00",
      timezone: "UTC",
      timestamp: 1726790400,
      status: "TBD",
      competition: {
        id: 562,
        name: "Reserve League",
        country: "Belarus",
        logo: "https://media.api-sports.io/football/leagues/562.png",
        flag: "https://media.api-sports.io/flags/by.svg",
        season: 2024,
      },
      venue: {
        id: 8650,
        name: "Stadyen Spartak",
        city: "Bobruisk",
      },
      round: "Regular Season - 22",
      teams: {
        home: {
          id: 11645,
          name: "Dinamo Brest Res.",
          logo: "https://media.api-sports.io/football/teams/11645.png",
        },
        away: {
          id: 23153,
          name: "Arsenal Res.",
          logo: "https://media.api-sports.io/football/teams/23153.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
    },
    {
      id: 1178352,
      referee: null,
      timezone: "UTC",
      date: "2024-09-20T00:00:00+00:00",
      timestamp: 1726790400,
      venue: {
        id: null,
        name: null,
        city: null,
      },
      status: "TBD",
      competition: {
        id: 562,
        name: "Reserve League",
        country: "Belarus",
        logo: "https://media.api-sports.io/football/leagues/562.png",
        flag: "https://media.api-sports.io/flags/by.svg",
        season: 2024,
      },
      round: "Regular Season - 22",
      teams: {
        home: {
          id: 11654,
          name: "Slavia Res.",
          logo: "https://media.api-sports.io/football/teams/11654.png",
          winner: null,
        },
        away: {
          id: 11655,
          name: "Slutsk Res.",
          logo: "https://media.api-sports.io/football/teams/11655.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
    },
    {
      id: 1185403,
      referee: null,
      timezone: "UTC",
      date: "2024-09-20T13:30:00+00:00",
      timestamp: 1726839000,
      periods: {
        first: 1726839000,
        second: null,
      },
      venue: {
        id: 8650,
        name: "Stadyen Spartak",
        city: "Bobruisk",
      },
      status: "1H",
      competition: {
        id: 117,
        name: "1. Division",
        country: "Belarus",
        logo: "https://media.api-sports.io/football/leagues/117.png",
        flag: "https://media.api-sports.io/flags/by.svg",
        season: 2024,
      },
      round: "Regular Season - 25",
      teams: {
        home: {
          id: 3384,
          name: "Belshina",
          logo: "https://media.api-sports.io/football/teams/3384.png",
          winner: false,
        },
        away: {
          id: 7808,
          name: "MKK-Dnepr",
          logo: "https://media.api-sports.io/football/teams/7808.png",
          winner: true,
        },
      },
      goals: {
        home: 0,
        away: 2,
      },
    },
  ];
