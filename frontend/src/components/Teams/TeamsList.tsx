import React from "react";
import styled from "styled-components";
import Team from "../../types/Team";
import { Link } from "react-router-dom";
import useSeeMore from "../../hooks/useSeeMore";
import SeeMoreButton from "../../ui-components/SeeMoreButton";

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
  height: 110px;

  &:hover {
    transform: scale(1.05);
  }
`;

const TeamLogo = styled.img`
  width: 3rem;
  height: 3rem;
  padding: 5px; /* Optional: Add padding around the logo */
  object-fit: contain;
  transition: transform 0.3s;

  ${TeamCard}:hover & {
    transform: scale(1.2);
  }
`;

const TeamName = styled.div`
  margin-top: 5px;
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
  const { visibleItems, handleSeeMore } = useSeeMore(teams.length, 3, 11, 2);

  return (
    <>
      {teams.length === 0 ? (
        <NoTeamsMessage>{message}</NoTeamsMessage>
      ) : (
        <>
          <TeamsGrid>
            {teams.slice(0, visibleItems).map((team) => (
              <TeamCard to={`/team/${team.id}`} key={team.id}>
                <TeamLogo
                  src={team.logo ? team.logo : "shield.png"}
                  alt={team.name}
                />
                <TeamName>{team.name}</TeamName>
              </TeamCard>
            ))}
          </TeamsGrid>
          {visibleItems < teams.length && (
            <SeeMoreButton onClick={handleSeeMore} />
          )}
        </>
      )}
    </>
  );
};

export default TeamsList;
