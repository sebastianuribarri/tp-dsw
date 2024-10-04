import React from "react";
import styled from "styled-components";
import Competition from "../../types/Competition";
import useSeeMore from "../../hooks/useSeeMore";
import SeeMoreButton from "../../ui-components/SeeMoreButton";
import { Link } from "react-router-dom";

const CompetitionsGrid = styled.div<{ layoutDirection: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ layoutDirection }) => layoutDirection};
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const CompetitionCard = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #2b2b2b;
  border-radius: 5px;
  padding: 0 15px;
  border-left-width: 5px;
  border-color: #008641;
  text-align: left;
  transition: 0.2s;
  cursor: pointer;
  height: 60px; /* Constant height */
  width: 100%;

  @media (min-width: 768px) {
    min-width: 180px;
    width: 300px;
  }
  &:hover {
    background-color: #008641;
  }
`;

const CompetitionLogo = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 10px;
`;

const CompetitionName = styled.div`
  font-size: 1em;
  display: flex;
  width: 100%;
  justify-content: center;

  @media (min-width: 768px) {
    font-size: 0.9em;
  }
`;

const NoCompetitionsMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;

interface CompetitionsListProps {
  competitions: Competition[];
  message: string;
  layoutDirection?: "row" | "column"; // New prop for setting grid layout
}

const CompetitionsList: React.FC<CompetitionsListProps> = ({
  competitions,
  message,
  layoutDirection = "column", // Default to 'column' if not provided
}) => {
  const { visibleItems, handleSeeMore } = useSeeMore(
    competitions.length,
    1,
    4,
    5
  );

  return (
    <>
      {competitions.length === 0 ? (
        <NoCompetitionsMessage>{message}</NoCompetitionsMessage>
      ) : (
        <>
          <CompetitionsGrid layoutDirection={layoutDirection}>
            {competitions.slice(0, visibleItems).map((competition) => (
              <CompetitionCard
                to={`/league/${competition.id}`}
                key={competition.id}
              >
                <CompetitionLogo
                  src={competition.logo}
                  alt={competition.name}
                />
                <CompetitionName>{competition.name}</CompetitionName>
              </CompetitionCard>
            ))}
          </CompetitionsGrid>
          {visibleItems < competitions.length && (
            <SeeMoreButton onClick={handleSeeMore} />
          )}
        </>
      )}
    </>
  );
};

export default CompetitionsList;
