import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createPrediction,
  getPredictionByIds,
  getValuesByMatch,
} from "../../../api/prediction";
import Section from "../../../ui-components/Section";
import NeedPremiumMessage from "../../NeedPremiumMessage";

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

const ResultBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const ResultBar = styled.div`
  display: flex;
  width: 95%; /* Further increased width */
  max-width: 1400px; /* Set a maximum width */
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

const ResultSegment = styled.div<{ width: number; color: string }>`
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
  height: 100%;
  border-right: 3px solid white; /* Increased division */
  &:last-child {
    border-right: none; /* Remove border from the last segment */
  }
`;

const Percentage = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-weight: bold;
  gap: 10px; /* Add space between percentages */
`;

const TeamName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  gap: 10px; /* Add space between team names */
`;

const TeamNameItem = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  text-align: center;
`;

const PercentageItem = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  text-align: center;
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

const MatchPrediction = ({
  matchId,
  homeTeam,
  awayTeam,
  userId,
}: MatchPredictionProps) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [results, setResults] = useState<{
    win: number;
    draw: number;
    lose: number;
  }>({
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
      setMessage("Ya votaste en este partido");
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
      setMessage("Prediccion realizada.");
      setMessageColor("green");
      setPrediction(value);
      const response = await getValuesByMatch(matchId);
      const matchResults = await response.json();
      setResults(matchResults);
    } catch (error) {
      console.error("Error submitting prediction:", error);
      setMessage("Error realizando la prediccion.");
      setMessageColor("red");
    }
  };

  const totalVotes = results.win + results.draw + results.lose;
  const winPercentage = totalVotes
    ? Math.round((results.win / totalVotes) * 100)
    : 0;
  const drawPercentage = totalVotes
    ? Math.round((results.draw / totalVotes) * 100)
    : 0;
  const losePercentage = totalVotes
    ? Math.round((results.lose / totalVotes) * 100)
    : 0;

  const getColor = (value: string) => {
    if (prediction === value) return "green";
    return "lightgray";
  };

  return (
    <Section title="Prediccion">
      <NeedPremiumMessage message="Necesitas una cuenta premium para realizar predicciones" />
      {message && <Message color={messageColor}>{message}</Message>}
      {prediction ? (
        <>
          <ResultBarContainer>
            <ResultBar>
              {winPercentage > 0 && (
                <ResultSegment width={winPercentage} color={getColor("win")} />
              )}
              {drawPercentage > 0 && (
                <ResultSegment
                  width={drawPercentage}
                  color={getColor("draw")}
                />
              )}
              {losePercentage > 0 && (
                <ResultSegment
                  width={losePercentage}
                  color={getColor("lose")}
                />
              )}
            </ResultBar>
          </ResultBarContainer>
          <TeamName>
            {winPercentage > 0 && (
              <TeamNameItem width={winPercentage}>{homeTeam}</TeamNameItem>
            )}
            {drawPercentage > 0 && (
              <TeamNameItem width={drawPercentage}>Empate</TeamNameItem>
            )}
            {losePercentage > 0 && (
              <TeamNameItem width={losePercentage}>{awayTeam}</TeamNameItem>
            )}
          </TeamName>
          <Percentage>
            {winPercentage > 0 && (
              <PercentageItem width={winPercentage}>
                {winPercentage}%
              </PercentageItem>
            )}
            {drawPercentage > 0 && (
              <PercentageItem width={drawPercentage}>
                {drawPercentage}%
              </PercentageItem>
            )}
            {losePercentage > 0 && (
              <PercentageItem width={losePercentage}>
                {losePercentage}%
              </PercentageItem>
            )}
          </Percentage>
        </>
      ) : (
        <ButtonContainer>
          <PredictionButton onClick={() => handlePredictionSubmit("win")}>
            {homeTeam}
          </PredictionButton>
          <PredictionButton onClick={() => handlePredictionSubmit("draw")}>
            Empate
          </PredictionButton>
          <PredictionButton onClick={() => handlePredictionSubmit("lose")}>
            {awayTeam}
          </PredictionButton>
        </ButtonContainer>
      )}
    </Section>
  );
};

export default MatchPrediction;
