// MatchesList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import Section from "../../../ui-components/Section";

const MatchCard = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #454545;
`;

const MatchDetails = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const PaginationButton = styled.button`
  background: #009a4a;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const DateMatchesList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Placeholder data
  const matches = [
    { id: 1, date: "2024-09-20", homeTeam: "Team A", awayTeam: "Team B" },
    { id: 2, date: "2024-09-21", homeTeam: "Team C", awayTeam: "Team D" },
    { id: 3, date: "2024-09-22", homeTeam: "Team E", awayTeam: "Team F" },
  ];

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const filteredMatches = matches.filter(
    (match) => match.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <Section title="Partidos">
      <Pagination>
        <PaginationButton onClick={handlePreviousDay}>
          Previous
        </PaginationButton>
        <span>{selectedDate.toDateString()}</span>
        <PaginationButton onClick={handleNextDay}>Next</PaginationButton>
      </Pagination>
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match) => (
          <MatchCard key={match.id}>
            <MatchDetails>
              {match.homeTeam} vs {match.awayTeam}
            </MatchDetails>
          </MatchCard>
        ))
      ) : (
        <MatchDetails>No matches found for this date.</MatchDetails>
      )}
    </Section>
  );
};

export default DateMatchesList;
