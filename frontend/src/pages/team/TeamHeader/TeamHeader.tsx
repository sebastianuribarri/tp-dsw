import React from "react";
import styled from "styled-components";
import Team from "../../../types/Team";
import TeamLogo from "../../../components/TeamLogo/TeamLogo";

interface LinkItem {
  name: string;
  url: string; // Should be an anchor identifier, like "#section1"
}

interface TeamHeaderProps {
  team: Team;
  links: LinkItem[];
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
  }
`;

const FollowButtonMobile = styled.button`
  background-color: #167f45;
  color: white;
  border-radius: 9999px; /* Full rounded */
  padding: 5px 15px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #484848;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const FollowButtonDesktop = styled(FollowButtonMobile)`
  display: none;

  @media (min-width: 768px) {
    display: inline-block;
    margin-top: 0;
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

const TeamHeader: React.FC<TeamHeaderProps> = ({ team, links }) => {
  return (
    <HeaderContainer>
      <TeamLogo team={team}></TeamLogo>
      <FollowButtonMobile>Seguir</FollowButtonMobile>
      <Tabs>
        {links.map((link) => (
          <a key={link.url} href={link.url}>
            {link.name}
          </a>
        ))}
      </Tabs>
      <FollowButtonDesktop>Seguir</FollowButtonDesktop>
    </HeaderContainer>
  );
};

export default TeamHeader;
