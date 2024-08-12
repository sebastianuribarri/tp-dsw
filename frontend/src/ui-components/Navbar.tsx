// background: linear-gradient(to top, #000, #00000015);
import React from "react";
import styled from "styled-components";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  background: linear-gradient(to top, #000, #00000015);
  transition: background 0.3s;

  @media (min-width: 768px) {
    flex-direction: column;
    position: static;
    width: 200px;
    background: none; /* Remove gradient for desktop */
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column; /* Stack icon and text vertically */
  align-items: center;
  padding: 10px;
  font-size: 1em;
  text-align: center;
  font-weight: normal;
  background-color: transparent; /* Default background color */
  transition: background-color 0.3s, transform 0.3s;

  width: 33.33%;
  &:hover {
    font-weight: bold;
    background-color: #22222290;
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    width: 100%;
    flex-direction: row; /* Align icon and text horizontally on desktop */
    font-size: 0.9em; /* Adjust font size for desktop */
    padding: 15px; /* Increase padding on desktop */
    border-bottom: none; /* Remove bottom border for desktop */
  }
`;

const Icon = styled.span`
  margin-bottom: 5px; /* Space between icon and text */
  font-size: 1.5em; /* Default icon size for mobile */
  transition: font-size 0.3s; /* Smooth transition for icon size */

  @media (min-width: 768px) {
    margin-right: 8px; /* Remove space between icon and text on desktop */
    font-size: 1.2em; /* Adjust icon size for desktop */
  }
`;

const Navbar: React.FC = () => {
  const path = window.location.pathname;

  return (
    <Nav>
      <NavLink to="/" className={path === "/" ? "active" : ""}>
        <Icon>
          <FaHome />
        </Icon>
        Inicio
      </NavLink>
      <NavLink to="/explorer" className={path === "/explorer" ? "active" : ""}>
        <Icon>
          <FaSearch />
        </Icon>
        Explorar
      </NavLink>
      <NavLink to="/profile" className={path === "/profile" ? "active" : ""}>
        <Icon>
          <FaUser />
        </Icon>
        Perfil
      </NavLink>
    </Nav>
  );
};

export default Navbar;
