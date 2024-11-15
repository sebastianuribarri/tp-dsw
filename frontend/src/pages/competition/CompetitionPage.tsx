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

  useEffect(() => {
    // Fetch data from the API
    const fetchCompetitionData = async () => {
      try {
        const response = await getCompetitionById(Number(id));
        const data = await response.json();

        setCompetitionDetail({
          id: data.id,
          name: data.name,
          start: new Date(data.start),
          end: new Date(data.end),
          logo: data.logo,
          standings: data.standings,
          rounds: data.rounds ?? [],
        });
      } catch (error) {
        console.error("Error fetching competition data:", error);
      }
    };

    fetchCompetitionData();
  }, []);

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
        <p>Competicia No existe</p>
      )}
    </>
  );
};

export default CompetitionPage;
