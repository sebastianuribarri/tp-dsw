import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Team from "../../types/Team";

const TeamsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #292929;
  border-radius: 5px;
  padding: 0 10px;
  border-top-width: 5px;
  border-top-color: #009a4a;
`;

const TeamCard = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 2px;
  border-bottom: 1px solid #454545; /* Border between list elements */
  width: 100%;
  cursor: pointer;
`;

const TeamLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
  object-fit: contain;
`;

const TeamName = styled.p`
  font-size: 16px;
  margin: 0; /* Remove default margin */
`;

const NoTeamsMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;

interface VerticalTeamsListProps {
  teams: Team[];
  message: string;
}

const VerticalTeamsList: React.FC<VerticalTeamsListProps> = ({
  teams,
  message,
}) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCardClick = (teamId: number) => {
    navigate(`/team/${teamId}`); // Navigate to the team page
  };

  return teams.length === 0 ? (
    <NoTeamsMessage>{message}</NoTeamsMessage>
  ) : (
    <TeamsListContainer>
      {teams.map((team) => (
        <TeamCard key={team.id} onClick={() => handleCardClick(team.id)}>
          <TeamLogo
            src={team.logo ? team.logo : "shield.png"}
            alt={team.name}
          />
          <TeamName>{team.name}</TeamName>
        </TeamCard>
      ))}
    </TeamsListContainer>
  );
};

export default VerticalTeamsList;
