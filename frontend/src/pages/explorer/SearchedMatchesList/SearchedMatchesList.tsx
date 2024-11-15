// src/components/Explorer/SearchedMatchesList/SearchedMatchesList.tsx
import React, { useEffect, useState } from "react";
import Section from "../../../ui-components/Section";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import { getMatchesBySearch } from "../../../api/match";

interface SearchedMatchesListProps {
  searchValue: string;
}

const SearchedMatchesList: React.FC<SearchedMatchesListProps> = ({ searchValue }) => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (searchValue && searchValue.length >= 5) {
          const response = await getMatchesBySearch(searchValue);
          const data = response.data;
          console.log("Matches:", response);
          setMatches(data);
        }
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fetchMatches();
  }, [searchValue]);

  return (
    <Section title="Resultados de búsqueda">
      <MatchesList
        matches={matches}
        message="No se encontraron partidos."
      />
    </Section>
  );
};

export default SearchedMatchesList;