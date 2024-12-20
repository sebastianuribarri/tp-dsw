import React from "react";
import styled from "styled-components";

interface PageProps {
  children: React.ReactNode;
}

// Contenedor para la página

// Contenedor para la página
const PageContainer = styled.div`
  margin-bottom: 60px;
  flex: 1;
  overflow-y: auto;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Page: React.FC<PageProps> = ({ children }) => {
  return <PageContainer>{children}</PageContainer>;
};

export default Page;
