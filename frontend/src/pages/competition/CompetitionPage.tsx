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
import CompetitionTeamsList from "./CompetitionTeamsList/CompetitionTeamList";

import styled from "styled-components";

const CompetitionContentContainer = styled.div`
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
        <>
          <PageMenu>
            <CompetitionHeader competition={competitionDetail} />
          </PageMenu>
          <Page>
            <CompetitionContentContainer>
              <CompetitionStandings standings={competitionDetail.standings} />
              <CompetitionMatches competitionId={competitionDetail.id} />
              <CompetitionTeamsList
                teams={competitionDetail.standings.map((s) => s.team)}
                message="Esta competencia no tiene equipos"
              />
            </CompetitionContentContainer>
            <CompetitionAbout
              start={competitionDetail.start}
              end={competitionDetail.end}
            />
          </Page>
        </>
      ) : (
        <p>Competición No existe</p>
      )}
    </>
  );
};

export default CompetitionPage;
