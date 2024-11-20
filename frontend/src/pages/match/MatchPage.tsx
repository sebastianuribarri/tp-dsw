import { useEffect, useState } from "react";
import { getMatch } from "../../api/match"; // Make sure to create this API function
import { useParams } from "react-router-dom";
import Page from "../../ui-components/Page";
import PageMenu from "../../ui-components/PageMenu/PageMenu";
import MatchEvents from "./MatchEvents/MatchEvents"; // Placeholder for match events
//import MatchLineups from "./MatchLineups/MatchLineups";
import MatchPrediction from "./MatchPredictions/MatchPredictions"; // Placeholder for predictions
import MatchAbout from "./MatchAbout/MatchAbout"; // Details about competition, round, and date
import MatchVote from "./MatchVote/MatchVote"; // Placeholder for voting
import styled from "styled-components";

import { MatchDetail } from "../../types/Match";
import MatchHeader from "./MatchHeader/MatchHeader";
import PageContent from "../../ui-components/PageContent";

const MatchContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const MatchPage = () => {
  const { id } = useParams();
  const [matchDetail, setMatchDetail] = useState<MatchDetail | null>(null);
  const userId_: string = sessionStorage.getItem("userId") || "";

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await getMatch(Number(id));
        const data = await response.data;

        setMatchDetail({
          ...data,
          date: new Date(data.date),
        });
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatchData();
  }, [id]);

  return (
    <>
      {matchDetail ? (
        <Page>
          <PageMenu>
            <MatchHeader match={matchDetail} />
          </PageMenu>
          <PageContent>
            <MatchContentContainer>
              <MatchEvents
                events={matchDetail.events}
                homeTeam={matchDetail.home}
                awayTeam={matchDetail.away}
              />

              <MatchVote
                matchId={matchDetail.id}
                lineups={matchDetail.lineups}
                userId={userId_}
              />
              <MatchPrediction
                matchId={matchDetail.id}
                homeTeam={matchDetail.home.name}
                awayTeam={matchDetail.away.name}
                userId={userId_}
              />
            </MatchContentContainer>
            <MatchAbout
              round={matchDetail.round}
              date={matchDetail.date}
              competition={matchDetail.competition}
            />
          </PageContent>
        </Page>
      ) : (
        <p>El partido no existe</p>
      )}
    </>
  );
};

export default MatchPage;