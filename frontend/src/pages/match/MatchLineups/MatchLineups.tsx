import { FC } from "react";
import Lineup from "../../../types/Lineup";

interface MatchLineupsProps {
  lineups: Lineup[];
}

const MatchLineups: FC<MatchLineupsProps> = ({ lineups }) => (
  <div>
    <h3>Alineaciones</h3>
    <div>
      <ul>
        {lineups[0].starters.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
      <ul>
        {lineups[1].starters.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default MatchLineups;
