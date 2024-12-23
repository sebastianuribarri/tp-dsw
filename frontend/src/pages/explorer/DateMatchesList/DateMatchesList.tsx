import React, { useState } from "react";
import styled from "styled-components";
import Section from "../../../ui-components/Section";
import { getMatches } from "../../../api/match";
import MatchesList from "../../../components/MatchesList/MatchesList";
import { useFetch } from "../../../hooks/useFetch";
import LoaderWrapper from "../../../ui-components/LoaderWrapper";

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

  const fetchMatches = async () => {
    const response = await getMatches(selectedDate);
    return response.data;
  };

  let {
    data: matches,
    loading,
    error,
  } = useFetch(fetchMatches, [selectedDate]);

  const handlePreviousDay = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1))
    );
  };

  const handleNextDay = () => {
    setSelectedDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
    );
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
      <LoaderWrapper loading={loading} error={error}>
        {matches !== null && (
          <MatchesList
            matches={matches}
            message="No hay partidos para esta fecha"
          />
        )}
      </LoaderWrapper>
    </Section>
  );
};

export default DateMatchesList;
