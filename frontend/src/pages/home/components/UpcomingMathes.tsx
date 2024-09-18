import React, { useEffect, useState } from "react";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import Section from "../../../ui-components/Section";
import { getMatches } from "../../../api/match";

const UpcomingMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatchesData = async () => {
      const res = await getMatches();
      setMatches(res);
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
