import { useParams } from "react-router-dom";
import Page from "../../ui-components/Page";
import PageMenu from "../../ui-components/PageMenu/PageMenu";
import CompetitionHeader from "./CompetitionHeader/CompetitionHeader";
import { CompetitionDetail } from "../../types/Competition";
import CompetitionMatches from "./CompetitionMatches/CompetitionMatches";
import CompetitionStandings from "./CompetitionStadings/CompetitionStandings";
import CompetitionAbout from "./CompetitionAbout/CompetitionAbout";

import styled from "styled-components";
import PageContent from "../../ui-components/PageContent";
import { useFetch } from "../../hooks/useFetch";
import { getCompetitionById } from "../../api/competition";
import LoaderWrapper from "../../ui-components/LoaderWrapper";

const CompetitionContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CompetitionPage = () => {
  const { id } = useParams();

  const fetchCompetitionData = async (): Promise<CompetitionDetail> => {
    const response = await getCompetitionById(Number(id));
    const data = response.data;
    return {
      id: data.id,
      name: data.name,
      start: new Date(data.start),
      end: new Date(data.end),
      logo: data.logo,
      standings: data.standings,
      rounds: data.rounds ?? [],
    };
  };

  const {
    data: competitionDetail,
    loading,
    error,
  } = useFetch(fetchCompetitionData);

  return (
    <Page>
      <PageMenu>
        {competitionDetail && (
          <CompetitionHeader competition={competitionDetail} />
        )}
      </PageMenu>
      <PageContent>
        <LoaderWrapper loading={loading} error={error}>
          {competitionDetail ? (
            <>
              <CompetitionContentContainer>
                <CompetitionStandings standings={competitionDetail.standings} />
                <CompetitionMatches
                  competitionId={competitionDetail.id}
                  rounds={competitionDetail.rounds}
                />
              </CompetitionContentContainer>
              <CompetitionAbout
                start={competitionDetail.start}
                end={competitionDetail.end}
              />
            </>
          ) : (
            <p>Competencia no existe</p>
          )}
        </LoaderWrapper>
      </PageContent>
    </Page>
  );
};

export default CompetitionPage;
