import { FC } from "react";
import { MatchDetail } from "../../../types/Match";

interface MatchHeaderProps {
  match: MatchDetail;
}

const MatchHeader: FC<MatchHeaderProps> = ({ match }) => (
  <header>
    <h1>{match.competition.name}</h1>
    <h2>
      {match.home.name} vs {match.away.name}
    </h2>
  </header>
);

export default MatchHeader;
