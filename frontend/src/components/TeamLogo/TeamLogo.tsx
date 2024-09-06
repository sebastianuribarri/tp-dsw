import React from "react";
import styled from "styled-components";
import Team from "../../types/Team";

interface TeamLogoProps {
  team: Team;
}

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row; /* Use row layout for both mobile and desktop */
  align-items: center;
  justify-content: center; /* Center items horizontally */
`;

const LogoImage = styled.img`
  width: 50px; /* Unified size for both mobile and desktop */
  height: 50px;

  @media (min-width: 768px) {
    width: 50px; /* Keep the same size on desktop */
    height: 50px;
  }
`;

const TeamName = styled.span`
  color: white;
  font-size: 1.1rem; /* Unified font size for both mobile and desktop */
  margin-left: 10px; /* Margin adjusted for consistent spacing */

  font-weight: 500;
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
