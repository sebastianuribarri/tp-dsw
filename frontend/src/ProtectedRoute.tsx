import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Verificar si el token está presente en sessionStorage
  const token = sessionStorage.getItem("authToken");
  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, permitir el acceso a la ruta
  return <>{children}</>;
};

export default ProtectedRoute;
