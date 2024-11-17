import React from "react";
import Match from "../../../types/Match";
import {
  MatchDetailsLink,
  TeamName,
  TeamHomeLogo,
  TeamAwayLogo,
  Container,
} from "./MatchDetails.styles";
import Score from "../Score";

interface MatchDetailsProps {
  match: Match;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => {
  return (
    <Container>
      <MatchDetailsLink to={`/match/${match.id}`}>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TeamHomeLogo src={match.home.logo} alt={match.home.name} />
            <Score match={match} />
            <TeamAwayLogo src={match.away.logo} alt={match.away.name} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TeamName>{match.home.name}</TeamName>
          <TeamName>{match.away.name}</TeamName>
        </div>
      </MatchDetailsLink>
    </Container>
  );
};

export default MatchDetails;
