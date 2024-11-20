import { useState, useEffect } from "react";
import styled from "styled-components";
import Player from "../../../types/Player";
import { createVote, getVoteByIds, getVotesByMatch } from "../../../api/vote";
import { Vote } from "../../../types/Vote";

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  width: 45%;
`;

const PlayerItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const PlayerImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const VoteButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const VotePercentage = styled.span`
  margin-left: 10px;
  font-weight: bold;
`;

const Message = styled.div`
  margin-top: 20px;
  color: green;
  font-weight: bold;
`;

interface MatchVoteProps {
  matchId: number;
  lineups: { starters: Player[] }[];
  userId: string;
}

const MatchVote = ({ matchId, lineups, userId }: MatchVoteProps) => {
  const [homePlayers, setHomePlayers] = useState<Player[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);
  //const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState<{ name: string; count: number }[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setHomePlayers(lineups[0].starters);
        setAwayPlayers(lineups[1].starters);

        const vote = await getVoteByIds(matchId, userId);
        if (vote.data) {
          setHasVoted(true);
        }

        const votesResponse = await getVotesByMatch(matchId);
        const votesData = votesResponse.data;
        setVotes(votesData);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeams();
  }, [lineups, matchId, userId]);

  const handleVote = async (player: Player) => {
    if (hasVoted) {
      setMessage("Ya has votado para este partido.");
      return;
    }

    const voteData: Vote = {
      match: matchId,
      user: userId,
      player: player,
    };

    setIsVoting(true);

    try {
      await createVote(voteData);
      setMessage(`Voto registrado para ${player.name}`);
      setHasVoted(true);

      const votesResponse = await getVotesByMatch(matchId);
      const votesData = votesResponse.data;
      setVotes(votesData);
    } catch (error) {
      console.error("Error al registrar voto:", error);
      setMessage("Error al registrar voto.");
    } finally {
      setIsVoting(false);
    }
  };

  const totalVotes = votes.reduce((acc, vote) => acc + vote.count, 0);

  return (
    <VoteContainer>
      <h3>Votar al Mejor Jugador</h3>
      <TeamContainer>
        <PlayerList>
          {homePlayers.map((player) => {
            const playerVotes = votes.find((vote) => vote.name === player.name)?.count || 0;
            const votePercentage = totalVotes ? ((playerVotes / totalVotes) * 100).toFixed(1) : "0";

            return (
              <PlayerItem key={player.id}>
                <div>
                  <PlayerImage src={player.image} alt={player.name} />
                  {player.name} - #{player.number} ({player.position})
                  {hasVoted && <VotePercentage>{votePercentage}%</VotePercentage>}
                </div>
                {!hasVoted && (
                  <VoteButton onClick={() => handleVote(player)} disabled={isVoting}>
                    Votar
                  </VoteButton>
                )}
              </PlayerItem>
            );
          })}
        </PlayerList>
        <PlayerList>
          {awayPlayers.map((player) => {
            const playerVotes = votes.find((vote) => vote.name === player.name)?.count || 0;
            const votePercentage = totalVotes ? ((playerVotes / totalVotes) * 100).toFixed(1) : "0";

            return (
              <PlayerItem key={player.id}>
                <div>
                  <PlayerImage src={player.image} alt={player.name} />
                  {player.name} - #{player.number} ({player.position})
                  {hasVoted && <VotePercentage>{votePercentage}%</VotePercentage>}
                </div>
                {!hasVoted && (
                  <VoteButton onClick={() => handleVote(player)} disabled={isVoting}>
                    Votar
                  </VoteButton>
                )}
              </PlayerItem>
            );
          })}
        </PlayerList>
      </TeamContainer>
      {message && <Message>{message}</Message>}
    </VoteContainer>
  );
};

export default MatchVote;