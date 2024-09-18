import React from "react";
import Section from "../../../ui-components/Section";
import VerticalTeamsList from "../../../components/Teams/VerticalTeamList";
import Team from "../../../types/Team";

interface CompetitionTeamsListProps {
  teams: Team[];
  message: string;
}

const CompetitionTeamsList: React.FC<CompetitionTeamsListProps> = ({
  teams,
  message,
}) => {
  return (
    <Section title="Equipos">
      <VerticalTeamsList teams={teams} message={message} />
    </Section>
  );
};

export default CompetitionTeamsList;
