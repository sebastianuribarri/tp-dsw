// CompetitionsList.tsx
import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import CompetitionsList from "../../../components/CompetitionsList/CompetitionsList";
import Competition from "../../../types/Competition";
import { getAllCompetitions } from "../../../api/competition";

const CurrentCompetitionsList: React.FC = () => {
  const [currentCompetitions, setTeamCompetitions] = useState<Competition[]>(
    []
  );
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await getAllCompetitions();
        const data = await response.json();
        const sortedCompetitions = data.sort(
          (a: Competition, b: Competition) => a.id - b.id
        );
        setTeamCompetitions(sortedCompetitions);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <Section title="Campeoneatos actuales">
      <CompetitionsList
        competitions={currentCompetitions}
        message="No hay campeonatos jugandose actualmente."
        layoutDirection="row"
      />
    </Section>
  );
};

export default CurrentCompetitionsList;
