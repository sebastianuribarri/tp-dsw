import React from "react";
import styled from "styled-components";
import Player from "../../types/Player";
import useSeeMore from "../../hooks/useSeeMore";
import { PageButton } from "../../ui-components/PageButton";

const PlayersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Further reduced gap to make the grid more compact */
  justify-content: center;
`;

const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2b2b;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  width: 90px; /* Reduced width */
  height: 130px; /* Reduced height */
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const PlayerImage = styled.img`
  width: 50px; /* Further reduced image width */
  height: 50px; /* Further reduced image height */
  border-radius: 50%;
  margin-bottom: 5px; /* Reduced margin */
`;

const PlayerName = styled.div`
  font-size: 0.7em; /* Further reduced font size */
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis if the name is too long */
  max-width: 80px; /* Ensure name fits within the card */
`;

const PlayerNumber = styled.div`
  font-size: 0.65em; /* Further reduced font size */
  color: #bbb;
  margin-top: 2px; /* Slightly adjust spacing */
`;

const PlayerPosition = styled.div`
  font-size: 0.65em; /* Further reduced font size */
  color: #bbb;
  margin-top: 2px; /* Slightly adjust spacing */
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
  const minItemWidth = 90;
  const { visibleItems, handleSeeMore } = useSeeMore(
    players.length,
    minItemWidth,
    2 // Number of items to show initially
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
