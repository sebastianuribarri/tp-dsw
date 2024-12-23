import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Page from "../../ui-components/Page";
import PageMenu from "../../ui-components/PageMenu/PageMenu";
import TeamHeader from "./TeamHeader/TeamHeader";
import TeamSeason from "./TeamSeason/TeamSeason";
import TeamMatches from "./TeamMatches/TeamMatches";
import PageContent from "../../ui-components/PageContent";
import { TeamDetail } from "../../types/Team";
import { useFetch } from "../../hooks/useFetch";
import LoaderWrapper from "../../ui-components/LoaderWrapper";
import { getTeamById } from "../../api/team";
import TeamPlayersList from "./PlayersList/PlayersList";

const TeamContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const TeamPage: React.FC = () => {
  const { id } = useParams();

  const fetchTeamData = async (): Promise<TeamDetail> => {
    const response = await getTeamById(Number(id));
    return response.data;
  };

  const { data: teamDetail, loading, error } = useFetch(fetchTeamData, [id]);

  return (
    <Page>
      <PageMenu>{teamDetail && <TeamHeader team={teamDetail} />}</PageMenu>
      <PageContent>
        <LoaderWrapper loading={loading} error={error}>
          {teamDetail ? (
            <TeamContentContainer>
              <TeamSeason />
              <TeamMatches teamId={teamDetail.id} />
              <TeamPlayersList players={teamDetail.players} />
            </TeamContentContainer>
          ) : (
            <p>Team no existe</p>
          )}
        </LoaderWrapper>
      </PageContent>
    </Page>
  );
};

export default TeamPage;
