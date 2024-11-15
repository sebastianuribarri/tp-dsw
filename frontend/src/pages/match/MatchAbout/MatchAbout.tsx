import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Section from "../../../ui-components/Section";

interface MatchAboutProps {
  date: string;
  round: string;
  competition: { id: number; name: string; logo: string };
}

const CompetitionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CompetitionLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: #333;
  border-radius: 5px;
  padding-right: 10px;
  margin-left: 10px;
`;

const CompetitionLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const CompetitionName = styled.p`
  font-size: 16px;
`;

const MatchAbout: FC<MatchAboutProps> = ({ date, round, competition }) => (
  <Section title="Acerca de">
    <p>Fecha: {new Date(date).toLocaleDateString()}</p>
    <p>Jornada: {round}</p>
    <CompetitionContainer>
      <p>Competencia:</p>
      <CompetitionLink to={`/league/${competition.id}`}>
        <CompetitionLogo src={competition.logo} alt={competition.name} />
        <CompetitionName>{competition.name}</CompetitionName>
      </CompetitionLink>
    </CompetitionContainer>
  </Section>
);

export default MatchAbout;
