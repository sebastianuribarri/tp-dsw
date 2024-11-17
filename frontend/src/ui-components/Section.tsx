import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  margin-bottom: 1.5em;
  text-align: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1em; /* Adds bottom margin */
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  text-transform: uppercase;
  color: #008641; /* Football pitch green */
  margin: 0;
`;

const DecorativeLine = styled.div`
  flex: 1;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    #008641,
    transparent
  ); /* Symmetric gradient */
`;

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, id }) => {
  return (
    <SectionContainer id={id}>
      <TitleContainer>
        <DecorativeLine />
        <Title>{title}</Title>
        <DecorativeLine />
      </TitleContainer>
      {children}
    </SectionContainer>
  );
};

export default Section;
