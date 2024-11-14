import { useEffect, useState } from "react";
import { getMatchById } from "../../api/match";  // Make sure to create this API function
import { useParams } from "react-router-dom";
import Page from "../../ui-components/Page";
import PageMenu from "../../ui-components/PageMenu/PageMenu";
import MatchHeader from "./MatchHeader/MatchHeader"; // You’ll need this component
import MatchEvents from "./MatchEvents/MatchEvents"; // Placeholder for match events
import MatchLineUps from "./MatchLineUps/MatchLineUps"; // Placeholder for match lineups
import MatchVote from "./MatchVote/MatchVote"; // Placeholder for voting
import MatchPrediction from "./MatchPrediction/MatchPrediction"; // Placeholder for predictions
import MatchAbout from "./MatchAbout/MatchAbout"; // Details about competition, round, and date
import styled from "styled-components";

import { MatchDetail } from "../../types/Match";

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
        const response = await getMatchById(Number(id));
        const data = await response.json();

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
            <MatchHeader match={matchDetail} />
          </PageMenu>
          <Page>
            <MatchContentContainer>
              <MatchEvents events={matchDetail.events} />
              <MatchLineUps lineups={matchDetail.lineups} />
              <MatchVote matchId={matchDetail.id} />
              <MatchPrediction matchId={matchDetail.id} />
            </MatchContentContainer>
            <MatchAbout
              competition={matchDetail.competition}
              round={matchDetail.round}
              date={matchDetail.date}
            />
          </Page>
        </>
      ) : (
        <p>El partido no existe</p>
      )}
    </>
  );
};

export default MatchPage;
