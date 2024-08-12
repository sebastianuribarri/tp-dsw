import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  margin-bottom: 1em;
`;

const Title = styled.h2`
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 10px;
`;

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <SectionContainer>
      <Title>{title}</Title>
      {children}
    </SectionContainer>
  );
};

export default Section;
