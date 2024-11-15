import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaHome, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AppLogo from "../../AppLogo/AppLogo";
import { getUserById } from "../../../api/user";
import { User } from "../../../types/User";

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #333;

  @media (min-width: 768px) {
    position: fixed;
    top: 0;
    height: 100%;
    width: 200px;
  }

  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    flex-direction: row;
    justify-content: space-around;
    height: 60px;
    background: linear-gradient(to top, #000, #00000015);
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 767px) {
    flex-direction: row;
    flex-grow: 0;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    font-weight: bold;
    background-color: #22222290;
    transform: scale(1.05);
  }

  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    font-size: 0.9em;
  }
`;

const Icon = styled.span`
  margin-right: 8px;
  font-size: 1.2em;

  @media (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 5px;
    font-size: 1.5em;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #444;
  color: white;

  @media (max-width: 767px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const AppLogoContainer = styled.div`
  padding: 15px;
  text-align: center;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await getUserById(userId);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <Nav>
      <AppLogoContainer>
        <AppLogo />
      </AppLogoContainer>
      {user ? (
        <>
          <LinksContainer>
            <NavLink to="/">
              <Icon>
                <FaHome />
              </Icon>
              Inicio
            </NavLink>
            <NavLink to="/explorer">
              <Icon>
                <FaSearch />
              </Icon>
              Explorar
            </NavLink>
            <NavLink to="/profile">
              <Icon>
                <FaUser />
              </Icon>
              Perfil
            </NavLink>
          </LinksContainer>
          <UserInfo>
            <span>{user.username}</span>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt /> Salir
            </LogoutButton>
          </UserInfo>
        </>
      ) : (
        <UserInfo>
          <span>Invitado</span>
        </UserInfo>
      )}
    </Nav>
  );
};

export default Navbar;
