import React from "react";
import styled from "styled-components";
import Competition from "../../types/Competition";
import useSeeMore from "../../hooks/useSeeMore";
import { PageButton } from "../../ui-components/PageButton";
import { Link } from "react-router-dom";

const CompetitionsGrid = styled.div`
  display: flex; // Changed from grid to flex for horizontal layout
  flex-wrap: wrap; // Allows wrapping of items if they overflow
  gap: 10px;
`;

const CompetitionCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2b2b2b;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;
  max-width: 100px; // Set maximum width for the card
  width: 100px; // Set fixed width for consistency

  &:hover {
    transform: scale(1.05);
  }
`;

const CompetitionLogo = styled.img`
  width: 3rem;
  height: 3rem;
  margin-bottom: 10px;
  transition: transform 0.3s;

  ${CompetitionCard}:hover & {
    transform: scale(1.2);
  }
`;

const CompetitionName = styled.div`
  font-size: 0.8em;
  color: white;
`;

const NoCompetitionsMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;

interface CompetitionsListProps {
  competitions: Competition[];
  message: string;
}

const CompetitionsList: React.FC<CompetitionsListProps> = ({
  competitions,
  message,
}) => {
  const minItemWidth = 150;
  const { visibleItems, handleSeeMore } = useSeeMore(
    competitions.length,
    minItemWidth,
    2
  );

  return (
    <>
      {competitions.length === 0 ? (
        <NoCompetitionsMessage>{message}</NoCompetitionsMessage>
      ) : (
        <>
          <CompetitionsGrid>
            {competitions.slice(0, visibleItems).map((competition) => (
              <CompetitionCard
                to={`/league/${competition.id}`} // Use absolute path
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
            <PageButton onClick={handleSeeMore}>Ver más</PageButton>
          )}
        </>
      )}
    </>
  );
};

export default CompetitionsList;
