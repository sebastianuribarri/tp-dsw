import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import Match from "../../../types/Match";
import Score from "../../../components/MatchesList/Score";

interface MatchHeaderProps {
  match: Match;
}

const MatchHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px; /* Ancho máximo */
`;

const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  cursor: pointer; /* Add cursor pointer to indicate clickability */
`;

const TeamLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
`;

const TeamName = styled.div`
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
`;

const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleTeamClick = (teamId: number) => {
    // Navigate to the team page
    navigate(`/team/${teamId}`);
  };

  return (
    <MatchHeaderContainer>
      <TeamSection onClick={() => handleTeamClick(match.home.id)}>
        <TeamLogo src={match.home.logo} alt={`${match.home.name} logo`} />
        <TeamName>{match.home.name}</TeamName>
      </TeamSection>
      <Score match={match} />
      <TeamSection onClick={() => handleTeamClick(match.away.id)}>
        <TeamLogo src={match.away.logo} alt={`${match.away.name} logo`} />
        <TeamName>{match.away.name}</TeamName>
      </TeamSection>
    </MatchHeaderContainer>
  );
};

export default MatchHeader;
