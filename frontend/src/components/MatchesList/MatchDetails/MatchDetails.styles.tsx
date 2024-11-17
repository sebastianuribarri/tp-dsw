import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const MatchDetailsLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 0 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #444;
  }
`;

export const TeamHomeLogo = styled.img`
  width: 50px;
  height: 50px;
`;

export const TeamAwayLogo = styled.img`
  width: 50px;
  height: 50px;
`;

export const TeamName = styled.div`
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
`;
