import React from "react";
import styled from "styled-components";
import Section from "../../../ui-components/Section";

interface CompetitionAboutProps {
  start: Date;
  end: Date;
}

const InfoText = styled.div`
  display: flex;
  font-size: 1em;
  color: #fff;
`;

const DateText = styled.p`
  padding: 0 8px;
  font-size: 1em;
  color: #999;
`;

const CompetitionAbout: React.FC<CompetitionAboutProps> = ({ start, end }) => {
  return (
    <Section title="Acerca de">
      <InfoText>
        Comienza: <DateText>{start.toDateString()}</DateText>
        Finaliza:{" "}
        <DateText>
          {end ? end.toDateString() : "Sin fecha de finalizacion"}
        </DateText>
      </InfoText>
      {/* You can add more details here if needed */}
    </Section>
  );
};

export default CompetitionAbout;
