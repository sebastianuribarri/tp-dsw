import React, { useEffect, useState } from "react";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Section from "../../../ui-components/Section";
import IMatch from "../../../types/Match";
import { getLiveMatches } from "../../../api/match";

const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchMatches = async () => {
      const response = await getLiveMatches();
      setMatches(response.data);
    };
    fetchMatches();
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
