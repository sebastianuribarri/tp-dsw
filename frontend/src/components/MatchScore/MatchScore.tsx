import Match from "../../types/Match";
import { ScoreContainer } from "./MatchScore.styles";

type Props = {
  match: Match;
};

function MatchScore({ match }: Props) {
  return (
    <ScoreContainer>
      {match.status === "success" && <></>}
      {match.status === "error" && <></>}
      {match.status === "loading" && <></>}
      {match.status !== "success" && <></>}
    </ScoreContainer>
  );
}

export default MatchScore;
