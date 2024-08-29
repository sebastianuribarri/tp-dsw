import React from "react";
import Section from "../../../ui-components/Section";
import MatchesList from "../../../components/MatchesList/MatchesList";

const TeamMatches: React.FC = () => {
  return (
    <Section title="Partidos" id="partidos">
      <MatchesList matches={[]} message="No hay partidos de este equipo." />
    </Section>
  );
};

export default TeamMatches;
