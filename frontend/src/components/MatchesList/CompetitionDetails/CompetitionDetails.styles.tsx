import styled from "styled-components";
import { Link } from "react-router-dom";

export const CompetitionDetailsLink = styled(Link)`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #444; /* Mobile bottom border */
  text-decoration: none;
  color: white;

  @media (min-width: 768px) {
    width: 30%;
    min-width: 25%;
    margin-bottom: 0;
    margin-right: 15px;
    border-bottom: none;
    border-right: 1px solid #444;
    padding-right: 15px;
    padding-bottom: 0;
  }
  transition: transform 0.3s ease; /* Smooth transition for hover effect */
  &:hover {
    transform: scale(1.07); /* Enlarge logo on hover */
  }
`;

export const CompetitionLogo = styled.img`
  width: 50px; /* Increased size of competition logo */
  height: 50px; /* Increased size of competition logo */
  margin-right: 10px;
`;

export const CompetitionInfo = styled.div`
  font-size: 0.8em;
  color: white;
`;

export const CompetitionName = styled.div`
  font-size: 1.15em; /* Larger font size for competition name */
  font-weight: bold;
`;

export const CompetitionRound = styled.div`
  font-size: 1em; /* Smaller font size for round */
`;
