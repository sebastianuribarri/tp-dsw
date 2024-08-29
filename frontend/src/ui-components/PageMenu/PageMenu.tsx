import React from "react";
import { PageMenuContainer } from "./PageMenu.styles";

interface PageMenuProps {
  children: React.ReactNode; // El componente a renderizar en el área principal
}

const PageMenu: React.FC<PageMenuProps> = ({ children }) => {
  return (
    <>
      <PageMenuContainer>{children}</PageMenuContainer>
    </>
  );
};

export default PageMenu;
