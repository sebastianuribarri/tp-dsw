import AppLogo from "../AppLogo/AppLogo";
import { MenuContainer } from "./Menu.styles";
import Navbar from "./Navbar/Navbar";

const Menu = () => {
  return (
    <MenuContainer>
      <AppLogo />
      <Navbar />
    </MenuContainer>
  );
};

export default Menu;
