import { useState, useEffect } from "react";
import styled from "styled-components";
import { createVote } from "../../../api/vote";
import { Vote } from "../../../types/Vote";
import Player from "../../../types/Player";
import Lineup from "../../../types/Lineup";

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const TeamContainer = styled.div`
  margin: 10px 0;
`;

const PlayerOption = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const PlayerImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PlayerSelect = styled.select`
  padding: 5px;
  font-size: 1rem;
`;

const VoteButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

interface MatchVoteProps {
  matchId: number;
  lineups: Lineup[];
}

const MatchVote = ({ matchId, lineups }: MatchVoteProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setPlayers(lineups[0].starters);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeams();
  }, [lineups]);

  const handleVote = async () => {
    // Verificar que se ha seleccionado un jugador
    if (!selectedPlayer) {
      alert("Seleccione un jugador para votar.");
      return;
    }

    // Crear el objeto de voto con el jugador completo
    const voteData: Vote = {
      match: matchId,
      user: "",
      player: selectedPlayer, // Aquí pasas el objeto Player completo
    };

    setIsVoting(true);

    try {
      // Llamar a la función para registrar el voto
      await createVote(voteData);
      alert(`Voto registrado para ${selectedPlayer.name}`);
    } catch (error) {
      console.error("Error al registrar voto:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <VoteContainer>
      <h3>Votar al Mejor Jugador</h3>

      <TeamContainer>
        <PlayerSelect
          onChange={(e) => setSelectedPlayer(players[+e.target.value])}
        >
          <option value="">Seleccione un jugador</option>
          {players.map((player, index) => (
            <option key={player.id} value={index}>
              <PlayerOption>
                <PlayerImage src={player.image} alt={player.name} />
                {player.name} - #{player.number} ({player.position})
              </PlayerOption>
            </option>
          ))}
        </PlayerSelect>
      </TeamContainer>

      <VoteButton onClick={handleVote} disabled={isVoting || !selectedPlayer}>
        Enviar Voto
      </VoteButton>
    </VoteContainer>
  );
};

export default MatchVote;
