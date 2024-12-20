// TeamsList.tsx
import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import TeamsList from "../../../components/TeamsList/TeamsList";
import Team from "../../../types/Team";
import { getAllTeams, getTeamsBySearch } from "../../../api/team";

interface AllTeamsListProps {
  searchValue?: string;
}

const AllTeamsList: React.FC<AllTeamsListProps> = ({ searchValue }) => {
  const [teams, setTeamCompetitions] = useState<Team[]>([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        let response;
        if (searchValue && searchValue.length >= 5) {
          response = await getTeamsBySearch(searchValue);
        } else {
          response = await getAllTeams();
        }
        const data = response.data;
        data.sort((a: Team, b: Team) => a.id - b.id);
        setTeamCompetitions(data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchCompetitions();
  }, [searchValue]);

  return (
    <Section title="Equipos">
      <TeamsList teams={teams} message="No hay equipos disponibles aun." />
    </Section>
  );
};

export default AllTeamsList;
