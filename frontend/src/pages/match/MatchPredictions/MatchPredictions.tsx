import { useEffect, useState } from "react";
import styled from "styled-components";
import { createPrediction, getPredictionByIds, getValuesByMatch } from "../../../api/prediction";

const PredictionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px; /* Space between buttons */
`;

const PredictionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultBar = styled.div`
  display: flex;
  width: 100%;
  height: 40px; /* Increased height */
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

const ResultSegment = styled.div<{ width: number; color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
  color: white;
  font-weight: bold;
`;

const Message = styled.p<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: bold;
`;

interface MatchPredictionProps {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  userId: string;
}

const MatchPrediction = ({ matchId, homeTeam, awayTeam, userId }: MatchPredictionProps) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [results, setResults] = useState<{ win: number; draw: number; lose: number }>({
    win: 0,
    draw: 0,
    lose: 0,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>("");

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const userPrediction = await getPredictionByIds(matchId, userId);
        if (userPrediction) {
          setPrediction(userPrediction.data.value);
          const response = await getValuesByMatch(matchId);
          const matchResults = await response.json();
          setResults(matchResults);
        }
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    };

    fetchPrediction();
  }, [matchId, userId]);

  const handlePredictionSubmit = async (value: string) => {
    if (prediction) {
      setMessage("You have already voted for this match.");
      setMessageColor("red");
      return;
    }

    try {
      const predictionData = {
        match: matchId,
        user: userId,
        value,
      };

      await createPrediction(predictionData);
      setMessage("Prediction submitted successfully.");
      setMessageColor("green");
      setPrediction(value);
      const response = await getValuesByMatch(matchId);
      const matchResults = await response.json();
      setResults(matchResults);
    } catch (error) {
      console.error("Error submitting prediction:", error);
      setMessage("Error submitting prediction.");
      setMessageColor("red");
    }
  };

  const totalVotes = results.win + results.draw + results.lose;
  const winPercentage = totalVotes ? Math.round((results.win / totalVotes) * 100) : 0;
  const drawPercentage = totalVotes ? Math.round((results.draw / totalVotes) * 100) : 0;
  const losePercentage = totalVotes ? Math.round((results.lose / totalVotes) * 100) : 0;

  const getColor = (value: string) => {
    if (prediction === value) return "green";
    return "lightgray";
  };

  return (
    <PredictionContainer>
      <h3>PREDICCION</h3>
      {message && <Message color={messageColor}>{message}</Message>}
      {prediction ? (
        <ResultBar>
          {winPercentage > 0 && (
            <ResultSegment width={winPercentage} color={getColor("win")}>
              {winPercentage}% {homeTeam}
            </ResultSegment>
          )}
          {drawPercentage > 0 && (
            <ResultSegment width={drawPercentage} color={getColor("draw")}>
              {drawPercentage}% Draw
            </ResultSegment>
          )}
          {losePercentage > 0 && (
            <ResultSegment width={losePercentage} color={getColor("lose")}>
              {losePercentage}% {awayTeam}
            </ResultSegment>
          )}
        </ResultBar>
      ) : (
        <ButtonContainer>
          <PredictionButton onClick={() => handlePredictionSubmit("win")}>{homeTeam}</PredictionButton>
          <PredictionButton onClick={() => handlePredictionSubmit("draw")}>Empate</PredictionButton>
          <PredictionButton onClick={() => handlePredictionSubmit("lose")}>{awayTeam}</PredictionButton>
        </ButtonContainer>
      )}
    </PredictionContainer>
  );
};

export default MatchPrediction;