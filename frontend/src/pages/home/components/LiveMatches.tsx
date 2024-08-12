import React, { useEffect, useState } from "react";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Section from "../../../ui-components/Section";
import IMatch from "../../../types/Match";

const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);

  useEffect(() => {
    // Replace with your API endpoint

    setMatches([
      {
        id: 239625,
        competition: {
          id: 200,
          name: "Botola Pro",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          start: new Date("2020-02-06T14:00:00+00:00"),
          end: new Date("2021-02-06T14:00:00+00:00"),
        },
        round: "Regular Season - 14",
        timezone: "UTC",
        date: new Date("2020-02-06T14:00:00+00:00"),
        venue: {
          id: 1887,
          name: "Stade Municipal",
          city: "Oued Zem",
        },
        status: "HT",
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
      },
      {
        id: 239626,
        competition: {
          id: 200,
          name: "Botola Pro",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          start: new Date("2020-02-06T14:00:00+00:00"),
          end: new Date("2021-02-06T14:00:00+00:00"),
        },
        round: "Regular Season - 14",
        timezone: "UTC",
        date: new Date("2020-02-06T14:00:00+00:00"),
        venue: {
          id: 1887,
          name: "Stade Municipal",
          city: "Oued Zem",
        },
        status: "HT",
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
      },
      {
        id: 239627,
        competition: {
          id: 200,
          name: "Botola Pro",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          start: new Date("2020-02-06T14:00:00+00:00"),
          end: new Date("2021-02-06T14:00:00+00:00"),
        },
        round: "Regular Season - 14",
        timezone: "UTC",
        date: new Date("2020-02-06T14:00:00+00:00"),
        venue: {
          id: 1887,
          name: "Stade Municipal",
          city: "Oued Zem",
        },
        status: "HT",
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
      },
      {
        id: 239628,
        competition: {
          id: 200,
          name: "Botola Pro",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          start: new Date("2020-02-06T14:00:00+00:00"),
          end: new Date("2021-02-06T14:00:00+00:00"),
        },
        round: "Regular Season - 14",
        timezone: "UTC",
        date: new Date("2020-02-06T14:00:00+00:00"),
        venue: {
          id: 1887,
          name: "Stade Municipal",
          city: "Oued Zem",
        },
        status: "HT",
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
      },
      {
        id: 239629,
        competition: {
          id: 200,
          name: "Botola Pro",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          start: new Date("2020-02-06T14:00:00+00:00"),
          end: new Date("2021-02-06T14:00:00+00:00"),
        },
        round: "Regular Season - 14",
        timezone: "UTC",
        date: new Date("2020-02-06T14:00:00+00:00"),
        venue: {
          id: 1887,
          name: "Stade Municipal",
          city: "Oued Zem",
        },
        status: "HT",
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
      },
    ]);
  }, []);

  return (
    <Section title="En vivo">
      <MatchesList
        matches={matches}
        message="No hay partidos en vivo en este momento."
      />
    </Section>
  );
};

export default LiveMatches;
