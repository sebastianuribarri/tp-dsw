import { PageMenuContainer } from "./PageMenu.styles";

interface PageMenuProps {
  children: React.ReactNode; // The component to render inside the menu
}

const PageMenu: React.FC<PageMenuProps> = ({ children }) => {
  return <PageMenuContainer>{children}</PageMenuContainer>;
};

export default PageMenu;
