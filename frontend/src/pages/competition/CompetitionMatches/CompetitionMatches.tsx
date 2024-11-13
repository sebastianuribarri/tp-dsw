import React, { useEffect, useState } from "react";
import Match from "../../../types/Match";
import Section from "../../../ui-components/Section";
import styled from "styled-components";
import MatchDetails from "../../../components/MatchesList/MatchDetails/MatchDetails";
import { getMatches } from "../../../api/match";

export const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  ); /* 300px is the minimum card size */
  gap: 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(220px, 1fr)
    ); /* Adjusted for larger screens */
  }
`;

export const MatchCard = styled.div`
  background-color: #2b2b2b;
  border-radius: 5px;
  transition: transform 0.3s;
  cursor: pointer;
  border-left: 5px solid #009a4a;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const NoMatchesMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;

interface CompetitionMatchesProps {
  competitionId: number | null;
}

const CompetitionMatchesListContainer = styled.div`
  min-width: 50%;
`;

const CompetitionMatches: React.FC<CompetitionMatchesProps> = ({
  competitionId,
}) => {
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    const fetchMatches = async (competitionId: number | null) => {
      if (!competitionId) setMatches([]);
      else {
        const response = await getMatches({ "competition.id": competitionId });
        setMatches(response.data);
      }
    };
    fetchMatches(competitionId);
  }, [competitionId]);
  return (
    <CompetitionMatchesListContainer>
      <Section title="Partidos">
        {matches.length === 0 ? (
          <NoMatchesMessage>
            No hay partidos en esta competencia
          </NoMatchesMessage>
        ) : (
          <MatchesGrid>
            {matches.map((match) => (
              <MatchCard key={match.id}>
                <MatchDetails match={match} />
              </MatchCard>
            ))}
          </MatchesGrid>
        )}
      </Section>
    </CompetitionMatchesListContainer>
  );
};

export default CompetitionMatches;
