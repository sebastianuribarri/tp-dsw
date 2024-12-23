import React from "react";
import Section from "../../../ui-components/Section";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import { getMatchesBySearch } from "../../../api/match";
import { useFetch } from "../../../hooks/useFetch";
import LoaderWrapper from "../../../ui-components/LoaderWrapper";

interface SearchedMatchesListProps {
  searchValue: string;
}

const SearchedMatchesList: React.FC<SearchedMatchesListProps> = ({
  searchValue,
}) => {
  const fetchMatches = async (): Promise<Match[]> => {
    if (searchValue) {
      const response = await getMatchesBySearch(searchValue);
      return response.data;
    }
    return [];
  };

  const {
    data: matches,
    loading,
    error,
  } = useFetch(fetchMatches, [searchValue]);

  return (
    <Section title="Resultados de búsqueda">
      <LoaderWrapper loading={loading} error={error}>
        <MatchesList
          matches={matches || []}
          message="No se encontraron partidos."
        />
      </LoaderWrapper>
    </Section>
  );
};

export default SearchedMatchesList;
