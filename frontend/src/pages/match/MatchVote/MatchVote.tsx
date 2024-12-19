import { useState, useEffect } from "react";
import styled from "styled-components";
import Player from "../../../types/Player";
import { createVote, getVoteByIds, getVotesByMatch } from "../../../api/vote";
import { Vote } from "../../../types/Vote";
import Section from "../../../ui-components/Section";
import NeedPremiumMessage from "../../../components/NeedPremiumMessage";

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

const VoteCount = styled.span`
  margin-left: 10px;
  font-weight: bold;
`;

const Message = styled.div`
  margin-top: 20px;
  color: green;
  font-weight: bold;
`;

const NoLineupsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
`;

interface MatchVoteProps {
  matchId: number;
  lineups: { starters: Player[] }[];
  userId: string;
}

const MatchVote = ({ matchId, lineups, userId }: MatchVoteProps) => {
  const [homePlayers, setHomePlayers] = useState<Player[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState<{ player: Player; amount: number }[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setHomePlayers(lineups[0]?.starters || []);
        setAwayPlayers(lineups[1]?.starters || []);

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

  const sortedHomePlayers = [...homePlayers].sort((a, b) => {
    const aVotes = votes.find((vote) => vote.player.id === a.id)?.amount || 0;
    const bVotes = votes.find((vote) => vote.player.id === b.id)?.amount || 0;
    return bVotes - aVotes;
  });

  const sortedAwayPlayers = [...awayPlayers].sort((a, b) => {
    const aVotes = votes.find((vote) => vote.player.id === a.id)?.amount || 0;
    const bVotes = votes.find((vote) => vote.player.id === b.id)?.amount || 0;
    return bVotes - aVotes;
  });

  const isLineupEmpty =
    sortedHomePlayers.length === 0 && sortedAwayPlayers.length === 0;

  return (
    <Section title="Alineaciones">
      <NeedPremiumMessage message="Necesitas una cuenta premium para votar" />
      {isLineupEmpty ? (
        <NoLineupsMessage>
          Alineaciones no disponibles para este partido.
        </NoLineupsMessage>
      ) : (
        <VoteContainer>
          <NeedPremiumMessage message="Necesitas una cuenta premium para votar" />
          <TeamContainer>
            <PlayerList>
              {sortedHomePlayers.map((player) => {
                const playerVotes =
                  votes.find((vote) => vote.player.id === player.id)?.amount ||
                  0;

                return (
                  <PlayerItem key={player.id}>
                    <div>
                      <PlayerImage src={player.image} alt={player.name} />
                      {player.name} - #{player.number} ({player.position})
                      {hasVoted && <VoteCount>{playerVotes} votos</VoteCount>}
                    </div>
                    {!hasVoted && (
                      <VoteButton
                        onClick={() => handleVote(player)}
                        disabled={isVoting}
                      >
                        Votar
                      </VoteButton>
                    )}
                  </PlayerItem>
                );
              })}
            </PlayerList>
            <PlayerList>
              {sortedAwayPlayers.map((player) => {
                const playerVotes =
                  votes.find((vote) => vote.player.id === player.id)?.amount ||
                  0;

                return (
                  <PlayerItem key={player.id}>
                    <div>
                      <PlayerImage src={player.image} alt={player.name} />
                      {player.name} - #{player.number} ({player.position})
                      {hasVoted && <VoteCount>{playerVotes} votos</VoteCount>}
                    </div>
                    {!hasVoted && (
                      <VoteButton
                        onClick={() => handleVote(player)}
                        disabled={isVoting}
                      >
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
      )}
    </Section>
  );
};

export default MatchVote;
