// MatchDetails.styles.ts
import styled from "styled-components";
import { Link } from "react-router-dom";

export const MatchDetailsLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: white;
  transition: transform 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    transform: scale(1.05); /* Slightly enlarge the whole container */
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const HomeTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 40%;
  transition: transform 0.3s ease; /* Smooth transition for hover effect */
`;

export const AwayTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
  transition: transform 0.3s ease; /* Smooth transition for hover effect */
`;

export const TeamLogo = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 0.3rem;
  transition: transform 0.3s ease; /* Smooth transition for hover effect */

  ${MatchDetailsLink}:hover & {
    transform: scale(1.2); /* Enlarge logo on hover */
  }
`;

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
