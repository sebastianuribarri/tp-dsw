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
  padding: 20px;
  overflow-y: auto;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const PageContent: React.FC<PageProps> = ({ children }) => {
  return <PageContainer>{children}</PageContainer>;
};

export default PageContent;
