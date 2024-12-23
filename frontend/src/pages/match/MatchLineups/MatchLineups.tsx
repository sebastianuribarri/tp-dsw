import { FC } from "react";
import Lineup from "../../../types/Lineup";
import Section from "../../../ui-components/Section";
import styled from "styled-components";

interface MatchLineupsProps {
  lineups: Lineup[];
}

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #555;
  font-size: 1.2em;
`;

const MatchLineups: FC<MatchLineupsProps> = ({ lineups }) => {
  console.log("lineups", lineups);
  return (
    <Section title="Lineups">
      {lineups && lineups[0].starters.length > 0 ? (
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
      ) : (
        <Message>Las alineaciones no estan disponibles</Message>
      )}
    </Section>
  );
};

export default MatchLineups;
