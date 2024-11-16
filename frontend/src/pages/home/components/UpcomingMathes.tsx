import React, { useEffect, useState } from "react";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import Section from "../../../ui-components/Section";
import { getUserById } from "../../../api/user";
import { getMatchesByTeams } from "../../../api/match";

const UpcomingMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    const fetchMatchesData = async () => {
      if (userId) {
        const getUserResponse = await getUserById(userId);
        const user = getUserResponse.data;
        const teamIds = user.teams.map((team: { id: number }) => team.id);
        const getMatchesResponse = await getMatchesByTeams(teamIds);
        setMatches(getMatchesResponse.data);
      }
    };
    fetchMatchesData();
  }, []);

  return (
    <Section title="Próximos Partidos">
      <MatchesList
        matches={matches}
        message="No hay partidos próximos en este momento."
      />
    </Section>
  );
};

export default UpcomingMatches;
