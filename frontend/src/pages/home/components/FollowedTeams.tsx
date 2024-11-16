import React, { useEffect, useState } from "react";

import Section from "../../../ui-components/Section";
import Team from "../../../types/Team";
import TeamsList from "../../../components/TeamsList/TeamsList";
import { getUserById } from "../../../api/user";

const FollowedTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchUserTeams = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        const response = await getUserById(userId);
        const data = response.data;
        setTeams(data.teams);
      }
    };
    fetchUserTeams();
  }, []);

  return (
    <Section title="Tus Equipos">
      <TeamsList teams={teams} message="No sigues a ningun equipo" />
    </Section>
  );
};

export default FollowedTeams;
