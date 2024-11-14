import { FC } from "react";

interface MatchAboutProps {
  date: string;
  round: string;
}

const MatchAbout: FC<MatchAboutProps> = ({ date, round }) => (
  <div>
    <h3>Información del Partido</h3>
    <p>Fecha: {new Date(date).toLocaleDateString()}</p>
    <p>Jornada: {round}</p>
  </div>
);

export default MatchAbout;
