import React from "react";
import styled from "styled-components";
import Team from "../../types/Team";
import { Link } from "react-router-dom";
import useSeeMore from "../../hooks/useSeeMore";
import { PageButton } from "../../ui-components/PageButton";

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
`;

const TeamCard = styled(Link)`
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

  &:hover {
    transform: scale(1.05);
  }
`;

const TeamLogo = styled.img`
  width: 3rem;
  height: 3rem;
  transition: transform 0.3s;

  ${TeamCard}:hover & {
    transform: scale(1.2);
  }
`;

const TeamName = styled.div`
  margin-top: 10px;
  font-size: 0.8em;
`;

const NoTeamsMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;

interface TeamsListProps {
  teams: Team[];
  message: string;
}

const TeamsList: React.FC<TeamsListProps> = ({ teams, message }) => {
  const minItemWidth = 100;
  const { visibleItems, handleSeeMore } = useSeeMore(
    teams.length,
    minItemWidth,
    2
  );

  return (
    <>
      {teams.length === 0 ? (
        <NoTeamsMessage>{message}</NoTeamsMessage>
      ) : (
        <>
          <TeamsGrid>
            {teams.slice(0, visibleItems).map((team) => (
              <TeamCard to={`/team/${team.id}`} key={team.id}>
                <TeamLogo src={team.logo} alt={team.name} />
                <TeamName>{team.name}</TeamName>
              </TeamCard>
            ))}
          </TeamsGrid>
          {visibleItems < teams.length && (
            <PageButton onClick={handleSeeMore}>Ver mas</PageButton>
          )}
        </>
      )}
    </>
  );
};

export default TeamsList;
