import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: column;
    width: 200px; /* Adjust width as needed */
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #333; /* Ensure the background color matches your theme */
  }
`;
