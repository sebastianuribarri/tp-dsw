import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import Competition from "../../../types/Competition";
import CompetitionsList from "../../../components/CompetitionsList/CompetitionsList";
import { getCompetitionsByTeam } from "../../../api/competition";
import { useParams } from "react-router-dom";

const TeamSeason: React.FC = () => {
  const [teamCompetitions, setTeamCompetitions] = useState<Competition[]>([]);

  const { id } = useParams();
  useEffect(() => {
    const fetchTeamCompetitions = async () => {
      try {
        console.log(id);
        const response = await getCompetitionsByTeam(Number(id));
        const data = await response.json();
        setTeamCompetitions(data);
        console.log(teamCompetitions);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchTeamCompetitions();
  }, []);
  return (
    <Section title="Temporada" id="temporada">
      <CompetitionsList
        competitions={teamCompetitions}
        message="Este equipo no esta jugando ningun campeonato."
      />
    </Section>
  );
};

export default TeamSeason;
