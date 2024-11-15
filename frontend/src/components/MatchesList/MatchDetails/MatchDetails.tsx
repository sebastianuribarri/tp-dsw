import React from "react";
import Match from "../../../types/Match";
import {
  MatchDetailsLink,
  TeamName,
  Score,
  ScoreContainer,
  TeamHomeLogo,
  TeamAwayLogo,
} from "./MatchDetails.styles";
import styled from "styled-components";

interface MatchDetailsProps {
  match: Match;
}

const NamesContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 100%;
  justify-content: space-between;
`;
const ScoreAndLogosContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => {
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
    <MatchDetailsLink to={`/match/${match.id}`}>
      <ScoreAndLogosContainer>
        <TeamHomeLogo src={match.home.logo} alt={match.home.name} />

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

        <TeamAwayLogo src={match.away.logo} alt={match.away.name} />
      </ScoreAndLogosContainer>
      <NamesContainer>
        <TeamName>{match.home.name}</TeamName>
        <TeamName>{match.away.name}</TeamName>
      </NamesContainer>
    </MatchDetailsLink>
  );
};

export default MatchDetails;
