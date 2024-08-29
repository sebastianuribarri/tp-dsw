import React, { useState } from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

interface NavbarLink {
  name: string;
  url: string; // The ID of the section to scroll to, e.g., "section1"
}

interface PageNavbarProps {
  links: NavbarLink[];
}

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavbarLinkStyled = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  padding: 5px 0;
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 2px solid transparent;

  &.active {
    border-bottom: 2px solid #167f45;
  }
`;

const NavbarList = styled.ul`
  display: flex;
  flex-direction: row;
`;

const NavbarItem = styled.li`
  padding: 5px 0;
  font-weight: 500;
  &:hover {
    border-bottom: 2px solid #167f45;
  }
`;

const PageNavbar: React.FC<PageNavbarProps> = ({ links }) => {
  const [click, setClick] = useState(false);

  const closeMenu = () => {
    setClick(false);
  };

  return (
    <NavbarContainer>
      <NavbarList className={click ? "active" : "nav-menu"}>
        {links.map((link) => (
          <NavbarItem key={link.url} className="nav-item">
            <NavbarLinkStyled
              to={link.url}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => {
                closeMenu();
                window.history.pushState(null, "", `#` + link.url);
              }}
            >
              {link.name}
            </NavbarLinkStyled>
          </NavbarItem>
        ))}
      </NavbarList>
    </NavbarContainer>
  );
};

export default PageNavbar;
