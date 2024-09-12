import React from "react";
import styled from "styled-components";
import Player from "../../types/Player";

const PlayersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Reduced gap for tighter layout */
  justify-content: center;
`;

const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2b2b;
  border-radius: 10px;
  padding: 7px;
  text-align: center;
  width: 110px; /* Reduced width */
  height: 160px; /* Reduced height */
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const PlayerImage = styled.img`
  width: 80px; /* Reduced image width */
  height: 80px; /* Reduced image height */
  border-radius: 50%;
  margin-bottom: 3px; /* Reduced margin */
`;

const PlayerName = styled.div`
  font-size: 0.85em; /* Increased font size for better visibility */
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px; /* Ensure the name fits within the card */
`;

const PlayerNumber = styled.div`
  font-size: 0.75em; /* Adjusted font size */
  color: #bbb;
`;

const PlayerPosition = styled.div`
  font-size: 0.75em; /* Adjusted font size */
  color: #bbb;
`;

const NoPlayersMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;

interface PlayersListProps {
  players: Player[];
  message: string;
}

const PlayersList: React.FC<PlayersListProps> = ({ players, message }) => {
  return (
    <>
      {players.length === 0 ? (
        <NoPlayersMessage>{message}</NoPlayersMessage>
      ) : (
        <>
          <PlayersGrid>
            {players.map((player) => (
              <PlayerCard key={player.id}>
                <PlayerImage src={player.image} alt={player.name} />
                <PlayerName>
                  {player.name
                    .replace("&apos;", "'")
                    .replace("Ã©", "é")
                    .replace("Ã¡", "a") //https://stackoverflow.com/questions/44011963/how-to-replace-encoded-characters-to-string-literals-like-udxyzw-or-something
                    .replace("Ã³", "o")
                    .replace("Ã", "i")}
                </PlayerName>
                <PlayerNumber>
                  {player.number ? `#${player.number}` : "-"}
                </PlayerNumber>
                <PlayerPosition>{player.position}</PlayerPosition>
              </PlayerCard>
            ))}
          </PlayersGrid>
        </>
      )}
    </>
  );
};

export default PlayersList;
