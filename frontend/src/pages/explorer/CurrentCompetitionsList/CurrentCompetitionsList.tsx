// CompetitionsList.tsx
import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import CompetitionsList from "../../../components/CompetitionsList/CompetitionsList";
import Competition from "../../../types/Competition";
import {
  getAllCompetitions,
  getCompetitionsBySearch,
} from "../../../api/competition";

interface CurrentCompetitionsListProps {
  searchValue?: string;
}

const CurrentCompetitionsList: React.FC<CurrentCompetitionsListProps> = ({
  searchValue,
}) => {
  const [currentCompetitions, setTeamCompetitions] = useState<Competition[]>(
    []
  );

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        let response;
        if (searchValue && searchValue.length >= 5) {
          response = await getCompetitionsBySearch(searchValue);
          console.log("Response competition:", response);
        } else {
          response = await getAllCompetitions();
        }
        const data = await response.data;
        const sortedCompetitions = data.sort(
          (a: Competition, b: Competition) => a.id - b.id
        );
        setTeamCompetitions(sortedCompetitions);
      } catch (err) {
        console.error("Error fetching team data:", err);
      }
    };

    fetchCompetitions();
  }, [searchValue]);

  return (
    <Section title="Campeonatos actuales">
      <CompetitionsList
        competitions={currentCompetitions}
        message="No hay campeonatos jugandose actualmente."
        layoutDirection="row"
      />
    </Section>
  );
};

export default CurrentCompetitionsList;
