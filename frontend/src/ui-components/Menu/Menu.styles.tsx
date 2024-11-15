import styled from "styled-components";

// Navbar (Alineada a la izquierda)
export const MenuContainer = styled.nav`
  position: fixed; /* Fijado a la izquierda */
  top: 60px; /* Alineado debajo del header */
  left: 0;
  width: 200px; /* Ajusta el tamaño de la navbar */
  height: 100%;
  background-color: #333;
  z-index: 200; /* Z-index mayor para estar encima del header */
  display: block;
  flex-direction: column;
`;
