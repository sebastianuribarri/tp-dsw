import { styled } from "styled-components";

export const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  grid-auto-rows: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  }
`;

export const MatchCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2b2b2b;
  border-radius: 5px;
  padding: 10px;
  transition: transform 0.3s;
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 15px;
  }
`;

export const NoMatchesMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;
