import React from "react";
import styled from "styled-components";
import Player from "../../types/Player";

// Contenedores para cada posición con bordes de diferentes colores
const GoalkeeperContainer = styled.div`
  border-left: 5px solid #944fff;
  border-radius: 5px;
  margin-bottom: 20px;
  padding-top: 5px;
  background: #944fff40;
`;

const DefenderContainer = styled.div`
  border-left: 5px solid #007abb;
  border-radius: 5px;
  margin-bottom: 20px;
  padding-top: 5px;
  background: #007abb40;
`;

const MidfielderContainer = styled.div`
  border-left: 5px solid #c2c200;
  border-radius: 5px;
  margin-bottom: 20px;
  padding-top: 5px;
  background: #c2c20050;
`;

const AttackerContainer = styled.div`
  border-left: 5px solid #ff0000;
  border-radius: 5px;
  margin-bottom: 20px;
  padding-top: 5px;
  background: #ff000040;
`;

// Contenedor común para los jugadores
const PlayerCard = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-top: 1px solid #454545;
  width: 100%;
  background: #2b2b2b;
`;

const PlayerImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  object-fit: contain;
  border-radius: 10%;
`;

const PlayerDetails = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
`;

const PlayerName = styled.p`
  font-size: 1em;
  margin: 0;
  color: white;
`;

const PlayerNumber = styled.p`
  font-size: 1em;
  margin: 0;
  color: #bbb;
`;

const NoPlayersMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;

const PositionTitle = styled.h2`
  color: white;
  font-size: 1.05em;
  border-bottom: 1px solid #454545;
  padding: 0 0 5px 10px;
`;

interface PlayersListProps {
  players: Player[];
  message: string;
}

// Función para agrupar jugadores por posición
const groupPlayersByPosition = (players: Player[]) => {
  return players.reduce((acc, player) => {
    if (!acc[player.position]) {
      acc[player.position] = [];
    }
    acc[player.position].push(player);
    return acc;
  }, {} as Record<string, Player[]>);
};

// Función para obtener el contenedor de posición correcto
const getPositionContainer = (position: string) => {
  switch (position.toLowerCase()) {
    case "goalkeeper":
      return GoalkeeperContainer;
    case "defender":
      return DefenderContainer;
    case "midfielder":
      return MidfielderContainer;
    case "attacker":
      return AttackerContainer;
    default:
      return DefenderContainer; // Valor por defecto
  }
};

const PlayersList: React.FC<PlayersListProps> = ({ players, message }) => {
  const playersByPosition = groupPlayersByPosition(players);

  return players.length === 0 ? (
    <NoPlayersMessage>{message}</NoPlayersMessage>
  ) : (
    <>
      {Object.entries(playersByPosition).map(([position, players]) => {
        const PositionContainer = getPositionContainer(position);
        return (
          <PositionContainer key={position}>
            <PositionTitle>{position}</PositionTitle>
            {players.map((player) => (
              <PlayerCard key={player.id}>
                <PlayerImage src={player.image} alt={player.name} />
                <PlayerDetails>
                  <PlayerName>
                    {player.name
                      .replace("&apos;", "'")
                      .replace("Ã©", "é")
                      .replace("Ã¡", "a")
                      .replace("Ã³", "o")
                      .replace("Ã", "i")}
                  </PlayerName>
                  <PlayerNumber>
                    {player.number ? `#${player.number}` : "-"}
                  </PlayerNumber>
                </PlayerDetails>
              </PlayerCard>
            ))}
          </PositionContainer>
        );
      })}
    </>
  );
};

export default PlayersList;
