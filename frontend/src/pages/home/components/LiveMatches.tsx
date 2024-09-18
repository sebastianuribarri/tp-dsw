import React, { useEffect, useState } from "react";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Section from "../../../ui-components/Section";
import IMatch from "../../../types/Match";
import { getMatches } from "../../../api/match";

const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);

  useEffect(() => {
    // Replace with your API endpoint

    const fetchMatchesData = async () => {
      const res = await getMatches();
      setMatches(res);
    };
    fetchMatchesData();
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
