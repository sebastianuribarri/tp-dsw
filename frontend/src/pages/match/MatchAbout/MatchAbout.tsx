import { FC } from "react";
import styled from "styled-components";

interface MatchAboutProps {
  date: string;
  round: string;
  competition: { id: number; name: string; logo: string };
}

const CompetitionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CompetitionLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const CompetitionLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const CompetitionName = styled.p`
  font-size: 16px;
  color: #333;
`;

const MatchAbout: FC<MatchAboutProps> = ({ date, round, competition }) => (
  <div>
    <h3>Información del Partido</h3>
    <p>Fecha: {new Date(date).toLocaleDateString()}</p>
    <p>Jornada: {round}</p>
    <CompetitionContainer>
      <CompetitionLink href={`/league/${competition.id}`}>
        <CompetitionLogo src={competition.logo} alt={competition.name} />
      </CompetitionLink>
      <CompetitionName>Competencia: {competition.name}</CompetitionName>
    </CompetitionContainer>
  </div>
);

export default MatchAbout;