import { useEffect, useState } from "react";
import { getCompetitionById } from "../../api/competition";
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
import useApi from "../../hooks/useApi"; // Importa el custom hook

const CompetitionContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CompetitionPage = () => {
  const { id } = useParams();
  const [competitionDetail, setCompetitionDetail] =
    useState<CompetitionDetail | null>(null);

  const { request, loading, error } = useApi();

  useEffect(() => {
    const fetchCompetitionData = async () => {
      const response = await request(() => getCompetitionById(Number(id)));
      const data = response.data as CompetitionDetail;
      if (data) {
        setCompetitionDetail({
          id: data.id,
          name: data.name,
          start: new Date(data.start),
          end: new Date(data.end),
          logo: data.logo,
          standings: data.standings,
          rounds: data.rounds ?? [],
        });
      }
    };

    fetchCompetitionData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {competitionDetail ? (
        <Page>
          <PageMenu>
            <CompetitionHeader competition={competitionDetail} />
          </PageMenu>
          <PageContent>
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
          </PageContent>
        </Page>
      ) : (
        <p>Competencia No existe</p>
      )}
    </>
  );
};

export default CompetitionPage;
