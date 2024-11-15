import styled from "styled-components";
import { Link } from "react-router-dom";

export const MatchDetailsLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
  width: 100%;
  flex-direction: column;
`;

export const TeamSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const TeamHomeLogo = styled.img`
  width: 40px; /* Smaller logo */
  height: 40px;
  margin-bottom: 5px;
  justify-content: flex-start;
`;
export const TeamAwayLogo = styled.img`
  width: 40px; /* Smaller logo */
  height: 40px;
  margin-bottom: 5px;
  justify-content: flex-end;
`;
export const TeamName = styled.div`
  font-size: 14px; /* Smaller font size for team names */
  text-align: center;
  white-space: nowrap;
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px; /* Margin for spacing between teams */
`;

export const Score = styled.div`
  font-size: 1.8em; /* Smaller font size for score */
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
`;
