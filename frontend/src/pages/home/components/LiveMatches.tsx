import React from "react";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Section from "../../../ui-components/Section";
import IMatch from "../../../types/Match";
import { getLiveMatches } from "../../../api/match";
import { useFetch } from "../../../hooks/useFetch";
import LoaderWrapper from "../../../ui-components/LoaderWrapper";

const LiveMatches: React.FC = () => {
  const fetchLiveMatches = async (): Promise<IMatch[]> => {
    const response = await getLiveMatches();
    return response.data;
  };

  const { data: matches, loading, error } = useFetch(fetchLiveMatches, []);

  return (
    <Section title="En vivo">
      <LoaderWrapper loading={loading} error={error}>
        {matches && (
          <MatchesList
            matches={matches}
            message="No hay partidos en vivo en este momento."
          />
        )}
      </LoaderWrapper>
    </Section>
  );
};

export default LiveMatches;
