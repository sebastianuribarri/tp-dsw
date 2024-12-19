import styled from "styled-components";

export const ScoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  flex-grow: 1;
  margin: 5px;
`;

export const Score = styled.div`
  font-size: 1.35em;
  font-weight: bold;
  text-align: center;
  white-space: nowrap; /* Prevents score from wrapping to multiple lines */
`;
