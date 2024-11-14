import { FC } from "react";

interface MatchAboutProps {
  date: string;
  venue: string;
}

const MatchAbout: FC<MatchAboutProps> = ({ date, venue }) => (
  <div>
    <h3>Información del Partido</h3>
    <p>Fecha: {new Date(date).toLocaleDateString()}</p>
    <p>Estadio: {venue}</p>
  </div>
);

export default MatchAbout;
