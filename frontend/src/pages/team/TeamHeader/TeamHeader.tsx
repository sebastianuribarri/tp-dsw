import React from "react";
import styled from "styled-components";
import Team from "../../../types/Team";
import TeamLogo from "../../../components/TeamLogo/TeamLogo";

interface TeamHeaderProps {
  team: Team;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row; /* Use row layout for both mobile and desktop */
  align-items: center;
  width: 100%;
  justify-content: space-between; /* Ensure items are spaced out */
  padding: 0 10px;
`;

const FollowButton = styled.button`
  background-color: #167f45;
  color: white;
  border-radius: 9999px; /* Full rounded */
  padding: 5px 15px;
  cursor: pointer;
  margin-right: 15px;
  @media (min-width: 768px) {
    margin-right: 20px;
  }
  &:hover {
    background-color: #008641;
  }
`;

export const Tabs = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding-top: 10px;

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    position: relative;
    margin: 0 1rem;
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
    width: auto;
    align-items: center;
    padding-top: 0;

    a {
      font-size: 0.9rem;
      margin: 0 2.5rem;
    }
  }
`;

const TeamLogoWrapper = styled.div`
  display: flex;
  align-items: center; /* Center vertically */
  @media (min-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <HeaderContainer>
      <TeamLogoWrapper>
        <TeamLogo team={team} />
      </TeamLogoWrapper>
      <FollowButton>Seguir</FollowButton>
    </HeaderContainer>
  );
};

export default TeamHeader;
