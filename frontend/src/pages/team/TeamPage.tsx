import { useEffect, useState } from "react";

import { getTeamById } from "../../api/team";
import { useParams } from "react-router-dom";
import Page from "../../ui-components/Page";
import PageMenu from "../../ui-components/PageMenu/PageMenu";

import TeamHeader from "./TeamHeader/TeamHeader";
import Team from "../../types/Team";

const TeamPage = () => {
  const { id } = useParams();
  const [team, setTeamData] = useState<Team | null>(null);

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
        });
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, []);

  const links = [
    { name: "Partidos", url: "#Partidos" },
    { name: "Temporada", url: "#Temporada" },
    { name: "Jugadores", url: "#Jugadores" },
  ];
  return (
    <>
      {team ? (
        <>
          {" "}
          <PageMenu>
            <TeamHeader team={team} links={links} />
          </PageMenu>
          <Page>TeamPage</Page>{" "}
        </>
      ) : (
        <p> Team No existe</p>
      )}
    </>
  );
};

export default TeamPage;
