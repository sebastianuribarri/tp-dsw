import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import { getMatchesByTeam } from "../../../api/match";
import styled from "styled-components";

interface TeamMatchesProps {
  teamId?: number;
}

const MatchesListContainer = styled.div`
  width: 100%;
  max-width: 25vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

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
  }, [teamId]);

  return (
    <Section title="Partidos" id="partidos">
      <MatchesListContainer>
        <MatchesList
          matches={matches}
          message="No hay partidos de este equipo."
        />
      </MatchesListContainer>
    </Section>
  );
};

export default TeamMatches;
