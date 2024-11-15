import { styled } from "styled-components";

export const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  grid-auto-rows: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

export const MatchCard = styled.div`
  display: flex;
  flex-direction: column; /* Keep this as column layout for both mobile and desktop */
  background-color: #2b2b2b;
  border-radius: 5px;
  transition: transform 0.3s;
  cursor: pointer;
  padding: 10px; /* Same padding for all screen sizes */
  border-left-width: 5px;
  border-color: #008641;
`;

export const NoMatchesMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;
