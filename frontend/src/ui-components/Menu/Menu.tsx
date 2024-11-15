import React from "react";
import { MenuContainer } from "./Menu.styles";
import Navbar from "./Navbar/Navbar";

const Menu: React.FC = () => {
  // Si el usuario no está logueado, no se renderiza el menú completo

  return (
    <MenuContainer>
      <Navbar />
    </MenuContainer>
  );
};

export default Menu;
