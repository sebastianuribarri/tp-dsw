import { useState, useEffect } from "react";
import styled from "styled-components";
import { createVote } from "../../../api/vote";
import { getTeamById } from "../../../api/team";
import { Vote } from "../../../types/Vote";
import Player from "../../../types/Player";

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
  homeTeamId: number;
  awayTeamId: number;
  userId: string;
}

const MatchVote = ({ matchId, homeTeamId, awayTeamId, userId }: MatchVoteProps) => {
  const [homePlayers, setHomePlayers] = useState<Player[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const homeResponse = await getTeamById(homeTeamId);
        const awayResponse = await getTeamById(awayTeamId);

        setHomePlayers((await homeResponse.json()).players);
        setAwayPlayers((await awayResponse.json()).players);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeams();
  }, [homeTeamId, awayTeamId]);

  const handleVote = async () => {
  // Verificar que se ha seleccionado un jugador
  if (!selectedPlayer) {
    alert("Seleccione un jugador para votar.");
    return;
  }

  // Crear el objeto de voto con el jugador completo
  const voteData: Vote = {
    match: matchId,
    user: userId,
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
        <h4>{`Jugadores de Local`}</h4>
        <PlayerSelect onChange={(e) => setSelectedPlayer(homePlayers[+e.target.value])}>
          <option value="">Seleccione un jugador</option>
          {homePlayers.map((player, index) => (
            <option key={player.id} value={index}>
              <PlayerOption>
                <PlayerImage src={player.image} alt={player.name} />
                {player.name} - #{player.number} ({player.position})
              </PlayerOption>
            </option>
          ))}
        </PlayerSelect>
      </TeamContainer>

      <TeamContainer>
        <h4>{`Jugadores de Visitante`}</h4>
        <PlayerSelect onChange={(e) => setSelectedPlayer(awayPlayers[+e.target.value])}>
          <option value="">Seleccione un jugador</option>
          {awayPlayers.map((player, index) => (
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

