import Match from "../../../types/Match";
import {
  CompetitionDetailsLink,
  CompetitionInfo,
  CompetitionLogo,
  CompetitionName,
  CompetitionRound,
} from "./CompetitionDetails.styles";

interface CompetitionDetailsProps {
  match: Match;
}

const CompetitionDetails: React.FC<CompetitionDetailsProps> = ({ match }) => {
  return (
    <CompetitionDetailsLink to={`/league/${match.competition.id}`}>
      <CompetitionLogo
        src={match.competition.logo}
        alt={match.competition.name}
      />
      <CompetitionInfo>
        <CompetitionName>{match.competition.name}</CompetitionName>
        <CompetitionRound>{match.round}</CompetitionRound>
      </CompetitionInfo>
    </CompetitionDetailsLink>
  );
};

export default CompetitionDetails;
