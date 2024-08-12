import Match from "../../../types/Match";
import {
  AwayTeam,
  HomeTeam,
  MatchDetailsLink,
  Score,
  ScoreContainer,
  TeamLogo,
} from "./MatchDetails.styles";

interface MatchDetailsProps {
  match: Match;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => {
  return (
    <MatchDetailsLink to={`/match/${match.id}`}>
      <HomeTeam>
        <TeamLogo src={match.teams.home.logo} alt={match.teams.home.name} />
        {match.teams.home.name}
      </HomeTeam>
      <ScoreContainer>
        <Score>
          {match.goals.home} - {match.goals.away}
        </Score>
      </ScoreContainer>
      <AwayTeam>
        {match.teams.away.name}
        <TeamLogo src={match.teams.away.logo} alt={match.teams.away.name} />
      </AwayTeam>
    </MatchDetailsLink>
  );
};

export default MatchDetails;
