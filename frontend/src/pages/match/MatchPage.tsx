import { useEffect, useState } from "react";
import { getMatch } from "../../api/match"; // Make sure to create this API function
import { useParams } from "react-router-dom";
import Page from "../../ui-components/Page";
import PageMenu from "../../ui-components/PageMenu/PageMenu";
import MatchEvents from "./MatchEvents/MatchEvents"; // Placeholder for match events
import MatchLineups from "./MatchLineups/MatchLineups";
import MatchVote from "./MatchVote/MatchVote"; // Placeholder for voting
import MatchPrediction from "./MatchPredictions/MatchPredictions"; // Placeholder for predictions
import MatchAbout from "./MatchAbout/MatchAbout"; // Details about competition, round, and date
import styled from "styled-components";

import { MatchDetail } from "../../types/Match";
import MatchDetails from "../../components/MatchesList/MatchDetails/MatchDetails";

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
        <>
          <PageMenu>
            <MatchDetails match={matchDetail} />
          </PageMenu>
          <Page>
            <MatchContentContainer>
              <MatchVote
                matchId={matchDetail.id}
                lineups={matchDetail.lineups}
              />
              <MatchPrediction matchId={matchDetail.id} />
            </MatchContentContainer>
            <MatchContentContainer>
                 <MatchEvents 
                events={matchDetail.events}
                homeTeam={matchDetail.home}
                awayTeam={matchDetail.away}
              />
              <MatchLineups lineups={matchDetail.lineups} />
            </MatchContentContainer>
            <MatchAbout round={matchDetail.round} date={matchDetail.date} />
          </Page>
        </>
      ) : (
        <p>El partido no existe</p>
      )}
    </>
  );
};

export default MatchPage;
