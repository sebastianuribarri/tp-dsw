import React from "react";
import Section from "../../../ui-components/Section";
import TeamsList from "../../../components/TeamsList/TeamsList";
import Team from "../../../types/Team";
import { getUserById } from "../../../api/user";
import { useFetch } from "../../../hooks/useFetch";
import LoaderWrapper from "../../../ui-components/LoaderWrapper";

const FollowedTeams: React.FC = () => {
  const fetchUserTeams = async (): Promise<Team[]> => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      const response = await getUserById(userId);
      const data = response.data;
      return data.teams;
    }
    return [];
  };

  const { data: teams, loading, error } = useFetch(fetchUserTeams, []);

  return (
    <Section title="Tus Equipos">
      <LoaderWrapper loading={loading} error={error}>
        {teams && (
          <TeamsList teams={teams} message="No sigues a ningun equipo" />
        )}
      </LoaderWrapper>
    </Section>
  );
};

export default FollowedTeams;
