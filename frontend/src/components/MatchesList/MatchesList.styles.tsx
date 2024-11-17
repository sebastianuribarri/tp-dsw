import { styled } from "styled-components";

export const MatchesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra los elementos horizontalmente */
  gap: 15px;
`;

export const MatchCard = styled.div`
  width: 400px; /* Ancho fijo para todos los elementos */
  display: flex;
  flex-direction: column;
  background-color: #2b2b2b;
  border-radius: 5px;
  transition: transform 0.3s;
  cursor: pointer;
  padding: 5px;
  border-left: 5px solid #008641;

  @media (max-width: 768px) {
    width: 100%; /* Ocupa todo el ancho en pantallas pequeñas */
  }
`;

export const NoMatchesMessage = styled.div`
  text-align: center;
  color: #bbb;
  padding: 20px;
`;
