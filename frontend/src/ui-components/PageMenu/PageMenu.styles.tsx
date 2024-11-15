import styled from "styled-components";
// Header (PageMenu)
export const PageMenuContainer = styled.header`
  position: fixed; /* Fijado arriba */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100; /* Z-index bajo para quedar detrás de la navbar */
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #292929;
  height: 60px; /* Altura del header */
`;
