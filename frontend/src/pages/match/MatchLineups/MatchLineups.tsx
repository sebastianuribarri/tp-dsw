import { FC } from "react";
import Lineup from "../../../types/Lineup";
import Section from "../../../ui-components/Section";


interface MatchLineupsProps {
  lineups: Lineup[];
}

const MatchLineups: FC<MatchLineupsProps> = ({ lineups }) => (
  <Section title="Lineups">
{lineups && lineups.length > 0 && (
      <>
        {lineups[0]?.starters && (
          <ul>
            {lineups[0].starters.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        )}
        {lineups[1]?.starters && (
          <ul>
            {lineups[1].starters.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        )}
      </>
    )}
  </Section>
);

export default MatchLineups;
