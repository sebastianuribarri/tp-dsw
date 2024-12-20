import React, { useMemo } from "react";
import Section from "../../../ui-components/Section";
import CompetitionsList from "../../../components/CompetitionsList/CompetitionsList";
import Competition from "../../../types/Competition";
import {
  getAllCompetitions,
  getCompetitionsBySearch,
} from "../../../api/competition";
import { useFetch } from "../../../hooks/useFetch";
import LoaderWrapper from "../../../ui-components/LoaderWrapper";

interface CurrentCompetitionsListProps {
  searchValue?: string;
}

const CurrentCompetitionsList: React.FC<CurrentCompetitionsListProps> = ({
  searchValue,
}) => {
  // Definir la función fetch según la lógica de búsqueda
  const fetchFunction = useMemo(() => {
    return async () => {
      if (searchValue && searchValue.length >= 5) {
        const response = await getCompetitionsBySearch(searchValue);
        return response.data;
      } else {
        const response = await getAllCompetitions();
        return response.data;
      }
    };
  }, [searchValue]);

  // Usar el hook useFetch
  const {
    data: competitions,
    loading,
    error,
  } = useFetch<Competition[]>(fetchFunction);

  // Ordenar las competiciones si están disponibles
  const sortedCompetitions = competitions
    ? [...competitions].sort((a, b) => a.id - b.id)
    : [];

  return (
    <Section title="Campeonatos actuales">
      <LoaderWrapper loading={loading} error={error}>
        <CompetitionsList
          competitions={sortedCompetitions}
          message="No hay campeonatos jugándose actualmente."
          layoutDirection="row"
        />
      </LoaderWrapper>
    </Section>
  );
};

export default CurrentCompetitionsList;
