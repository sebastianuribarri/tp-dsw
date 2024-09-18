import React, { useState } from "react";
import styled from "styled-components";
import Standing from "../../../types/Standing";
import Section from "../../../ui-components/Section";
import StandingsGroup from "./StandingsGroup/StandingsGroup";

interface CompetitionStandingsProps {
  standings: Standing[];
}

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Ensure the container takes full width */
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    display: none; /* Hide the selector container on larger screens */
  }
`;

const GroupsListContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    justify-content: center;
    align-items: start;
  }
`;

const GroupSelector = styled.select`
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  margin: 0 10px;
  min-width: 120px;
`;

const CompetitionStandings: React.FC<CompetitionStandingsProps> = ({
  standings,
}) => {
  const groupBy = (arr: Standing[], key: string) =>
    arr.reduce((result: Record<string, Standing[]>, item) => {
      (result[item[key as keyof Standing] as string] =
        result[item[key as keyof Standing] as string] || []).push(item);
      return result;
    }, {});

  const groupedStandings = groupBy(standings, "group");
  const groups = Object.keys(groupedStandings);
  const [selectedGroup, setSelectedGroup] = useState(groups[0] || "");

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(event.target.value);
  };

  const handleTeamClick = (teamId: number) => {
    window.location.href = `/team/${teamId}`;
  };

  return (
    <Section title="Tabla de posiciones">
      <TableContainer>
        <SelectorContainer>
          <GroupSelector onChange={handleGroupChange} value={selectedGroup}>
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </GroupSelector>
          {selectedGroup && groupedStandings[selectedGroup] && (
            <StandingsGroup
              group={selectedGroup}
              standings={groupedStandings[selectedGroup]}
              onTeamClick={handleTeamClick}
            />
          )}
        </SelectorContainer>
        <GroupsListContainer>
          {groups.map((group) => (
            <StandingsGroup
              key={group}
              group={group}
              standings={groupedStandings[group]}
              onTeamClick={handleTeamClick}
            />
          ))}
        </GroupsListContainer>
      </TableContainer>
    </Section>
  );
};

export default CompetitionStandings;
