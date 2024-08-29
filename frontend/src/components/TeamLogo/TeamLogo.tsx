import React from "react";
import styled from "styled-components";
import Team from "../../types/Team";

interface TeamLogoProps {
  team: Team;
}

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LogoImage = styled.img`
  width: 70px;
  height: 70px;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const TeamName = styled.span`
  color: white;
  font-size: 1.5rem;
  margin-top: 10px;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-top: 0;
    margin-left: 10px;
  }
`;

const TeamLogo: React.FC<TeamLogoProps> = ({ team }) => {
  return (
    <LogoContainer>
      <LogoImage src={team.logo} alt={`${team.name} Logo`} />
      <TeamName>{team.name}</TeamName>
    </LogoContainer>
  );
};

export default TeamLogo;
