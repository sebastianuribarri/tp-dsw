import React from "react";
import MatchesList from "../../../components/MatchesList/MatchesList";
import Match from "../../../types/Match";
import Section from "../../../ui-components/Section";
import { getUserById } from "../../../api/user";
import { getMatchesByTeams } from "../../../api/match";
import { useFetch } from "../../../hooks/useFetch";
import LoaderWrapper from "../../../ui-components/LoaderWrapper";

const UpcomingMatches: React.FC = () => {
  const userId = sessionStorage.getItem("userId");

  const fetchMatchesData = async (): Promise<Match[]> => {
    if (userId) {
      const getUserResponse = await getUserById(userId);
      const user = getUserResponse.data;
      const teamIds = user.teams.map((team: { id: number }) => team.id);
      const getMatchesResponse = await getMatchesByTeams(teamIds);
      return getMatchesResponse.data as Match[];
    }
    return [];
  };

  const {
    data: matches,
    loading,
    error,
  } = useFetch(fetchMatchesData, [userId]);

  return (
    <Section title="Próximos Partidos">
      <LoaderWrapper loading={loading} error={error}>
        {matches && (
          <MatchesList
            matches={matches}
            message="No hay partidos próximos para tus equipos."
          />
        )}
      </LoaderWrapper>
    </Section>
  );
};

export default UpcomingMatches;
