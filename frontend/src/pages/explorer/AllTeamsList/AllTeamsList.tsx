// TeamsList.tsx
import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import TeamsList from "../../../components/TeamsList/TeamsList";
import Team from "../../../types/Team";
import { getAllTeams } from "../../../api/team";

const AllTeamsList: React.FC = () => {
  const [teams, setTeamCompetitions] = useState<Team[]>([]);
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await getAllTeams();
        const data = await response.json();
        data.sort((a: Team, b: Team) => a.id - b.id);
        setTeamCompetitions(data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <Section title="Equipos">
      <TeamsList teams={teams} message="No hay equipos disponibles aun." />
    </Section>
  );
};

export default AllTeamsList;
