import React, { useEffect, useState } from "react";

import axios from "axios";
import Section from "../../../ui-components/Section";
import Team from "../../../types/Team";
import TeamsList from "../../../components/Teams/TeamsList";

const FollowedTeamsSection: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/teams").then((response) => {
      setTeams(response.data.sort((a: Team, b: Team) => a.id - b.id));
    });
  }, []);

  return (
    <Section title="Tus Equipos">
      <TeamsList teams={teams} message="No sigues a ningun equipo" />
    </Section>
  );
};

export default FollowedTeamsSection;
