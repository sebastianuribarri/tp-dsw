import React from "react";
import styled from "styled-components";
import Player from "../../types/Player";
import useSeeMore from "../../hooks/useSeeMore";
import { PageButton } from "../../ui-components/PageButton";

const PlayersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2b2b;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  max-width: 150px; // Adjust the width as needed
  width: 140px; // Set fixed width for consistency
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const PlayerImage = styled.img`
  width: 100px; // Adjust the width as needed
  height: 100px; // Adjust the height as needed
  border-radius: 50%;
  margin-bottom: 10px;
`;

const PlayerName = styled.div`
  font-size: 1em;
  font-weight: bold;
  color: white;
`;

const PlayerNumber = styled.div`
  font-size: 0.9em;
  color: #bbb;
`;

const PlayerPosition = styled.div`
  font-size: 0.8em;
  color: #bbb;
`;

const NoPlayersMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;

const SeeMoreButton = styled(PageButton)`
  display: block;
  margin: 20px auto;
`;

interface PlayersListProps {
  players: Player[];
  message: string;
}

const PlayersList: React.FC<PlayersListProps> = ({ players, message }) => {
  const minItemWidth = 150;
  const { visibleItems, handleSeeMore } = useSeeMore(
    players.length,
    minItemWidth,
    3 // Number of items to show initially
  );

  return (
    <>
      {players.length === 0 ? (
        <NoPlayersMessage>{message}</NoPlayersMessage>
      ) : (
        <>
          <PlayersGrid>
            {players.slice(0, visibleItems).map((player) => (
              <PlayerCard key={player.id}>
                <PlayerImage src={player.image} alt={player.name} />
                <PlayerName>{player.name}</PlayerName>
                <PlayerNumber>
                  {player.number ? "#" + String(player.number) : "-"}
                </PlayerNumber>
                <PlayerPosition>{player.position}</PlayerPosition>
              </PlayerCard>
            ))}
          </PlayersGrid>
          {visibleItems < players.length && (
            <SeeMoreButton onClick={handleSeeMore}>Ver más</SeeMoreButton>
          )}
        </>
      )}
    </>
  );
};

export default PlayersList;
