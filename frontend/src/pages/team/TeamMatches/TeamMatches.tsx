import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import { getMatches } from "../../../api/match";

const TeamMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    const fetchMatchesData = async () => {
      const res = await getMatches();
      setMatches(res);
    };
    fetchMatchesData();
  }, []);
  return (
    <Section title="Partidos" id="partidos">
      <MatchesList
        matches={matches}
        message="No hay partidos de este equipo."
      />
    </Section>
  );
};

export default TeamMatches;
