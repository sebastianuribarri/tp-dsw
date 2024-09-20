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
import Match from "../../types/Match";
import styled from "styled-components";
import { getMatches } from "../../api/match";

const CompetitionContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const CompetitionPage = () => {
  const { id } = useParams();
  const [competitionDetail, setCompetitionDetail] =
    useState<CompetitionDetail | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

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
        const fetchMatchesData = async () => {
          const res = await getMatches();
          setMatches(res);
        };
        fetchMatchesData();
      } catch (error) {
        console.error("Error fetching competition data:", error);
      }
    };

    fetchCompetitionData();
  }, [id]);

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
              <CompetitionMatches matches={matches} />
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
