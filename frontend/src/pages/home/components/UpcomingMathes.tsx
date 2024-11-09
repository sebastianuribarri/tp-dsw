import React, { useEffect, useState } from "react";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import Section from "../../../ui-components/Section";

const UpcomingMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatchesData = async () => {
      setMatches([]);
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
