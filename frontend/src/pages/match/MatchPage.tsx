import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Page from "../../ui-components/Page";
import PageMenu from "../../ui-components/PageMenu/PageMenu";
import MatchEvents from "./MatchEvents/MatchEvents";
import MatchPrediction from "./MatchPredictions/MatchPredictions";
import MatchAbout from "./MatchAbout/MatchAbout";
import MatchVote from "./MatchVote/MatchVote";
import MatchHeader from "./MatchHeader/MatchHeader";
import PageContent from "../../ui-components/PageContent";
import { MatchDetail } from "../../types/Match";
import { getMatch } from "../../api/match";
import { useFetch } from "../../hooks/useFetch";
import LoaderWrapper from "../../ui-components/LoaderWrapper";

const MatchContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const MatchPage: React.FC = () => {
  const { id } = useParams();
  const userId_: string = sessionStorage.getItem("userId") || "";

  const fetchMatchData = async (): Promise<MatchDetail> => {
    const response = await getMatch(Number(id));
    const data = response.data;
    return {
      ...data,
      date: new Date(data.date),
    };
  };

  const { data: matchDetail, loading, error } = useFetch(fetchMatchData, [id]);

  return (
    <Page>
      <PageMenu>{matchDetail && <MatchHeader match={matchDetail} />}</PageMenu>
      <PageContent>
        <LoaderWrapper loading={loading} error={error}>
          {matchDetail ? (
            <>
              <MatchContentContainer>
                <MatchEvents
                  events={matchDetail.events}
                  homeTeam={matchDetail.home}
                  awayTeam={matchDetail.away}
                />
                {new Date(matchDetail.date) <= new Date() && (
                  <MatchVote
                    matchId={matchDetail.id}
                    lineups={matchDetail.lineups}
                    userId={userId_}
                  />
                )}
                {new Date(matchDetail.date) >= new Date() && (
                  <MatchPrediction
                    matchId={matchDetail.id}
                    homeTeam={matchDetail.home.name}
                    awayTeam={matchDetail.away.name}
                    userId={userId_}
                  />
                )}
              </MatchContentContainer>
              <MatchAbout
                round={matchDetail.round}
                date={matchDetail.date}
                competition={matchDetail.competition}
              />
            </>
          ) : (
            <p>El partido no existe</p>
          )}
        </LoaderWrapper>
      </PageContent>
    </Page>
  );
};

export default MatchPage;
