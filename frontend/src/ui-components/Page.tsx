import React from "react";
import styled from "styled-components";

interface PageProps {
  children: React.ReactNode;
}

const PageContainer = styled.div`
  padding: 10px;
  margin-bottom: 60px;
  flex: 1;
  overflow-y: auto;
  @media (min-width: 768px) {
    margin-bottom: 0;
    padding: 10px 20px; /* Increased padding for desktop screens */
  }
`;

const Page: React.FC<PageProps> = ({ children }) => {
  return <PageContainer>{children}</PageContainer>;
};

export default Page;
