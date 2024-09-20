import React from "react";
import styled from "styled-components";
import Standing from "../../../../types/Standing";

interface StandingsGroupProps {
  group: string;
  standings: Standing[];
  onTeamClick: (teamId: number) => void;
}

const StandingsGroupContainer = styled.div`
  margin-top: 10px;
  background-color: #008641;
  border-radius: 10px;
  padding-bottom: 10px;
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-bottom: 5px; /* Space between tables */
    max-width: 350px;
  }
`;

const GroupTitle = styled.h3`
  color: white;
  margin-bottom: 8px; /* Space between title and table */
  font-weight: bold; /* Make the title bold */
  padding-top: 5px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;

  border-collapse: collapse;
  @media (min-width: 768px) {
    max-width: 350px;
  }
`;

const TableHeader = styled.th`
  width: 100%;
  background-color: #026130;
  color: white;
  padding: 5px 10px;
  text-align: left;
  white-space: nowrap; /* Prevent wrapping of header text */
`;

const TableRow = styled.tr`
  background-color: #222;
  &:nth-child(even) {
    background-color: #333;
  }
`;

const TableData = styled.td`
  padding: 8px 10px;
  border-bottom: 1px solid #444;
  color: white;
  white-space: nowrap; /* Prevent wrapping of data text */
`;

const TeamLogo = styled.img`
  width: 25px;
  height: 25px;
  object-fit: contain;
  margin-right: 10px;
`;

const TeamNameContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer; /* Indicate that it's clickable */
`;

const TeamName = styled.span`
  color: white;
`;

const StandingsGroup: React.FC<StandingsGroupProps> = ({
  group,
  standings,
  onTeamClick,
}) => (
  <StandingsGroupContainer>
    {/* Show title and table for each group */}
    <GroupTitle>{group}</GroupTitle>
    <Table>
      <thead>
        <tr>
          <TableHeader>Equipo</TableHeader>
          <TableHeader>Pts</TableHeader>
          <TableHeader>DG</TableHeader>
        </tr>
      </thead>
      <tbody>
        {standings.map((standing, index) => (
          <TableRow key={index}>
            <TableData>
              <TeamNameContainer
                onClick={() => onTeamClick(standing.team.id)} // Handle click
              >
                <TeamLogo
                  src={standing.team.logo}
                  alt={`${standing.team.name} logo`}
                />
                <TeamName>{standing.team.name}</TeamName>
              </TeamNameContainer>
            </TableData>
            <TableData>{standing.points}</TableData>
            <TableData>{standing.goalsDiff}</TableData>
          </TableRow>
        ))}
      </tbody>
    </Table>
  </StandingsGroupContainer>
);

export default StandingsGroup;
