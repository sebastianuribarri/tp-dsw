import styled from "styled-components";
import { Link } from "react-router-dom";

export const CompetitionDetailsLink = styled(Link)`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #444; /* Keep bottom border on all screen sizes */
  text-decoration: none;
  color: white;

  /* Remove media query, keeping the same layout across all screen sizes */
  width: auto; /* Let the link adjust its width dynamically */
  min-width: 130px;
  margin-right: 15px;

  padding-right: 15px;
  padding-bottom: 5px;
`;

export const CompetitionLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const CompetitionInfo = styled.div`
  font-size: 0.8em;
  color: white;
`;

export const CompetitionName = styled.div`
  font-size: 1.15em; /* Larger font size for competition name */
`;

export const CompetitionRound = styled.div`
  font-size: 1em; /* Smaller font size for round */
`;
