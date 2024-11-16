import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./ui-components/Menu/Navbar/Navbar";
import styled from "styled-components";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  margin-left: 200px; /* Deja espacio para el Navbar en pantallas grandes */

  @media (max-width: 767px) {
    margin-left: 0; /* Sin margen en dispositivos móviles */
    margin-bottom: 60px; /* Espacio para el Navbar inferior */
  }
`;
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Verificar si el token está presente en sessionStorage
  const token = sessionStorage.getItem("authToken");
  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, permitir el acceso a la ruta
  return (
    <>
      <Navbar />
      <MainContent>{children}</MainContent>
    </>
  );
};

export default ProtectedRoute;
