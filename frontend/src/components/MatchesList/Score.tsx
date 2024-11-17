import React from "react";
import styled, { keyframes } from "styled-components";

interface ScoreProps {
  match: {
    status: string;
    minute?: number;
    date: string;
    goals: {
      home: number | null;
      away: number | null;
    };
  };
}

const blink = keyframes`
  50% {
    opacity: 0.5;
  }
`;

const BlinkingText = styled.span`
  color: #00cb5b;
  font-size: 1em;
  font-weight: bold;
  animation: ${blink} 1s infinite;
`;

const ScoreContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ScoreText = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

const DateText = styled.div`
  font-size: 0.9em;
  margin-top: 5px;
`;

const Score: React.FC<ScoreProps> = ({ match }) => {
  const formattedDate = new Date(match.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const formattedTime = new Date(match.date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  switch (match.status) {
    case "TBD":
    case "NS":
      return (
        <ScoreContainer>
          <DateText>{formattedDate}</DateText>
          <DateText>{formattedTime}</DateText>
        </ScoreContainer>
      );

    case "HT":
      return (
        <ScoreContainer>
          Entretiempo
          <ScoreText>
            {match.goals.home} : {match.goals.away}
          </ScoreText>
        </ScoreContainer>
      );

    case "1H":
    case "2H":
    case "ET":
    case "BT":
    case "P":
    case "SUSP":
    case "INT":
      return (
        <ScoreContainer>
          {match.minute && <BlinkingText>{match.minute}'</BlinkingText>}
          <ScoreText>
            {match.goals.home} : {match.goals.away}
          </ScoreText>
        </ScoreContainer>
      );

    default:
      return (
        <ScoreContainer>
          Finalizado
          <ScoreText>
            {match.goals.home} : {match.goals.away}
          </ScoreText>
          <DateText>{formattedDate}</DateText>
        </ScoreContainer>
      );
  }
};

export default Score;
