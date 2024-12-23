import React from "react";
import Section from "../../../ui-components/Section";
import TeamsList from "../../../components/TeamsList/TeamsList";
import Team from "../../../types/Team";
import { getAllTeams, getTeamsBySearch } from "../../../api/team";
import { useFetch } from "../../../hooks/useFetch";
import LoaderWrapper from "../../../ui-components/LoaderWrapper";

interface AllTeamsListProps {
  searchValue?: string;
}

const AllTeamsList: React.FC<AllTeamsListProps> = ({ searchValue }) => {
  const fetchTeams = async (): Promise<Team[]> => {
    let response;
    if (searchValue && searchValue.length >= 5) {
      response = await getTeamsBySearch(searchValue);
    } else {
      response = await getAllTeams();
    }
    const data = response.data;
    data.sort((a: Team, b: Team) => a.id - b.id);
    return data;
  };

  const { data: teams, loading, error } = useFetch(fetchTeams, [searchValue]);

  return (
    <Section title="Equipos">
      <LoaderWrapper loading={loading} error={error}>
        {teams && (
          <TeamsList teams={teams} message="No hay equipos disponibles aun." />
        )}
      </LoaderWrapper>
    </Section>
  );
};

export default AllTeamsList;
