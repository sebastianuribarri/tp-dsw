import React from "react";
import styled, { keyframes } from "styled-components";

interface LoaderWrapperProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

// Animación de giro para el ícono de carga
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Estilos para el contenedor de carga y error
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LoadingIcon = styled.div`
  border: 3px solid transparent;
  border-top: 3px solid #167f45;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 0.8s linear infinite;
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 1rem;
`;

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return (
      <CenteredContainer>
        <LoadingIcon />
      </CenteredContainer>
    );
  }

  if (error) {
    return (
      <CenteredContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </CenteredContainer>
    );
  }

  return <>{children}</>;
};

export default LoaderWrapper;
