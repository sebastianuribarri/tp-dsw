import React from "react";
import Section from "../../../ui-components/Section";
import Player from "../../../types/Player";
import PlayersList from "../../../components/PlayersList/PlayersList";

interface PlayersListProps {
  players: Player[];
}

const TeamPlayersList: React.FC<PlayersListProps> = ({ players }) => {
  return (
    <Section title="Jugadores" id="jugadores">
      <PlayersList
        players={players}
        message="Los jugadores de este equipo no estan disponibles"
      />
    </Section>
  );
};

export default TeamPlayersList;
