import React from "react";
import styled from "styled-components";
import Team from "../../../types/Team";
import TeamLogo from "../../../components/TeamLogo/TeamLogo";
import BackButton from "../../../ui-components/BackButton/BackButton";
import FollowButton from "../components/FollowButton";

interface TeamHeaderProps {
  team: Team;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 10px;
`;

const TeamLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <HeaderContainer>
      <BackButton />
      <TeamLogoWrapper>
        <TeamLogo team={team} />
      </TeamLogoWrapper>
      <FollowButton teamId={team.id} />
    </HeaderContainer>
  );
};

export default TeamHeader;
