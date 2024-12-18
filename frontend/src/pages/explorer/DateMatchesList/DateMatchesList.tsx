import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Section from "../../../ui-components/Section";
import { getMatches } from "../../../api/match";
import Match from "../../../types/Match";
import MatchesList from "../../../components/MatchesList/MatchesList";

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
  const [matches, setMatches] = useState<Match[] | null>(null);

  // Fetch matches
  useEffect(() => {
    const fetchMatches = async (date: Date) => {
      const response = await getMatches({ date: date });
      const data = response.data;
      if (data) {
        setMatches(data);
      }
    };

    fetchMatches(selectedDate);
  }, [selectedDate]); // Re-fetch cuando la fecha cambie

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

  return (
    <Section title="Partidos">
      <Pagination>
        <PaginationButton onClick={handlePreviousDay}>
          Previous
        </PaginationButton>
        <span>{selectedDate.toDateString()}</span>
        <PaginationButton onClick={handleNextDay}>Next</PaginationButton>
      </Pagination>
      {matches !== null && (
        <MatchesList
          matches={matches}
          message="No hay partidos para esta fecha"
        />
      )}
    </Section>
  );
};

export default DateMatchesList;
