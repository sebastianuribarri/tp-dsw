import React from "react";
import styled from "styled-components";
import Competition from "../../types/Competition";
import useSeeMore from "../../hooks/useSeeMore";
import { PageButton } from "../../ui-components/PageButton";
import { Link } from "react-router-dom";

const CompetitionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CompetitionCard = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #2b2b2b;
  border-radius: 15px;
  padding: 0 10px;
  text-align: left;
  transition: transform 0.4s;
  cursor: pointer;
  height: 60px; /* Constant height */
  width: 100%;

  @media (min-width: 768px) {
    width: auto; /* Fit content on desktop */
  }
  &:hover {
    background-color: #454545;
  }
`;

const CompetitionLogo = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 10px;
  transition: transform 0.3s;
`;

const CompetitionName = styled.div`
  font-size: 0.8em;
  flex-grow: 1; /* Dynamic width based on name length */
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
  const minItemWidth = 100;
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
            <PageButton onClick={handleSeeMore}>Ver más</PageButton>
          )}
        </>
      )}
    </>
  );
};

export default CompetitionsList;
