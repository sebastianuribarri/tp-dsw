import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import { getMatchesByTeam } from "../../../api/match";

interface TeamMatchesProps {
  teamId?: number;
}

const TeamMatches: React.FC<TeamMatchesProps> = ({ teamId }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    const fetchMatchesData = async (teamId?: number) => {
      if (!teamId) setMatches([]);
      else {
        const res = await getMatchesByTeam(teamId);
        setMatches(res.data);
      }
    };
    fetchMatchesData(teamId);
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
