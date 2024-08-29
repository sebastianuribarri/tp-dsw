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
  id?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, id }) => {
  return (
    <SectionContainer id={id}>
      <Title>{title}</Title>
      {children}
    </SectionContainer>
  );
};

export default Section;
