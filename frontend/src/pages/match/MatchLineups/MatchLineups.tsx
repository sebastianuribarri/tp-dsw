import { FC } from "react";
import { Lineup } from "../../types/Match";

interface MatchLineupsProps {
  lineups: {
    home: Lineup;
    away: Lineup;
  };
}

const MatchLineups: FC<MatchLineupsProps> = ({ lineups }) => (
  <div>
    <h3>Alineaciones</h3>
    <div>
      <h4>{lineups.home.teamName}</h4>
      <ul>
        {lineups.home.players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
      <h4>{lineups.away.teamName}</h4>
      <ul>
        {lineups.away.players.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default MatchLineups;
