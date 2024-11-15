import React from "react";
import Navbar from "./Navbar/Navbar";

const Menu: React.FC = () => {
  // Si el usuario no está logueado, no se renderiza el menú completo

  return <Navbar />;
};

export default Menu;
