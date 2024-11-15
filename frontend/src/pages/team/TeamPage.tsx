import { useEffect, useState } from "react";

import { getTeamById } from "../../api/team";
import { useParams } from "react-router-dom";
import Page from "../../ui-components/Page";
import PageMenu from "../../ui-components/PageMenu/PageMenu";

import TeamHeader from "./TeamHeader/TeamHeader";
import { TeamDetail } from "../../types/Team";
import TeamMatches from "./TeamMatches/TeamMatches";
import TeamSeason from "./TeamSeason/TeamSeason";
import TeamPlayersList from "./PlayersList/PlayersList";
import styled from "styled-components";
import PageContent from "../../ui-components/PageContent";

const TeamContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
const TeamPage = () => {
  const { id } = useParams();
  const [teamDetail, setTeamData] = useState<TeamDetail | null>(null);

  useEffect(() => {
    // Fetch data from the API

    const fetchTeamData = async () => {
      try {
        const response = await getTeamById(Number(id));
        const data = await response.json();
        setTeamData({
          id: data.id,
          name: data.name,
          logo: data.logo,
          players: data.players,
        });
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <>
      {teamDetail ? (
        <>
          <PageMenu>
            <TeamHeader team={teamDetail} />
          </PageMenu>
          <PageContent>
            <TeamContentContainer>
              <TeamSeason />
              <TeamMatches teamId={teamDetail.id} />
              <TeamPlayersList players={teamDetail.players} />
            </TeamContentContainer>
          </PageContent>
        </>
      ) : (
        <p> Team No existe</p>
      )}
    </>
  );
};

export default TeamPage;
