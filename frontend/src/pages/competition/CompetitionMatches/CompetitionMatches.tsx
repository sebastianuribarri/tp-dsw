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

const CompetitionMatchesListContainer = styled.div`
  min-width: 50%;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  margin-bottom: 20px;
`;

const RoundSelector = styled.select`
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  margin: 0 10px;
  min-width: 120px;
`;

interface CompetitionMatchesProps {
  competitionId: number | null;
  rounds: string[];
}

const CompetitionMatches: React.FC<CompetitionMatchesProps> = ({
  competitionId,
  rounds,
}) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedRound, setSelectedRound] = useState<string | null>(null);

  useEffect(() => {
    if (rounds.length > 0 && selectedRound === null) {
      setSelectedRound(rounds[0]); // Seleccionar el primer round por defecto si hay al menos uno
    }
  }, [rounds]);

  useEffect(() => {
    const fetchMatches = async (
      competitionId: number | null,
      round: string | null
    ) => {
      if (!competitionId) {
        setMatches([]);
        return;
      }

      const params: Record<string, any> = { "competition.id": competitionId };
      if (round) {
        params["round"] = round; // Agregar el round si está seleccionado
      }

      try {
        const response = await getMatches(params);
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setMatches([]);
      }
    };

    fetchMatches(competitionId, selectedRound);
  }, [competitionId, selectedRound]);

  return (
    <CompetitionMatchesListContainer>
      <Section title="Partidos">
        <SelectorContainer>
          <RoundSelector
            value={selectedRound || ""}
            onChange={(e) => setSelectedRound(e.target.value || null)}
          >
            {rounds.length === 0 ? (
              <option value="" disabled>
                No hay rondas disponibles
              </option>
            ) : (
              rounds.map((round, index) => (
                <option key={index} value={round}>
                  {round}
                </option>
              ))
            )}
          </RoundSelector>
        </SelectorContainer>
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
