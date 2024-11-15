import React from "react";
import styled from "styled-components";
import Match from "../../../types/Match";

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

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const Score = styled.div`
  font-size: 1.8em;
  font-weight: bold;
  text-align: center;
`;

const MatchHeader: React.FC<MatchHeaderProps> = ({ match }) => {
  const formatDate = (date: Date): string => {
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);

    return `${formattedDate} | ${formattedTime}`;
  };
  return (
    <MatchHeaderContainer>
      <TeamSection>
        <TeamLogo src={match.home.logo} alt={`${match.home.name} logo`} />
        <TeamName>{match.home.name}</TeamName>
      </TeamSection>
      <ScoreContainer>
        {match.minute
          ? match.minute === 90
            ? "Fin (" + formatDate(new Date(match.date)) + ")"
            : String(match.minute) + "'"
          : formatDate(new Date(match.date))}
        <Score>
          {match.goals.home} : {match.goals.away}
        </Score>
      </ScoreContainer>
      <TeamSection>
        <TeamLogo src={match.away.logo} alt={`${match.away.name} logo`} />
        <TeamName>{match.away.name}</TeamName>
      </TeamSection>
    </MatchHeaderContainer>
  );
};

export default MatchHeader;
