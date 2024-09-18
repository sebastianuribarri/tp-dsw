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
  return (
    <MatchDetailsLink to={`/match/${match.id}`}>
      <ScoreAndLogosContainer>
        <TeamHomeLogo src={match.teams.home.logo} alt={match.teams.home.name} />

        <ScoreContainer>
          <Score>
            {match.goals.home} : {match.goals.away}
          </Score>
        </ScoreContainer>

        <TeamAwayLogo src={match.teams.away.logo} alt={match.teams.away.name} />
      </ScoreAndLogosContainer>
      <NamesContainer>
        <TeamName>{match.teams.home.name}</TeamName>
        <TeamName>{match.teams.away.name}</TeamName>
      </NamesContainer>
    </MatchDetailsLink>
  );
};

export default MatchDetails;
