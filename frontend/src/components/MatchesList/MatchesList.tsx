import React from "react";
import Match from "../../types/Match";
import CompetitionDetails from "./CompetitionDetails/CompetitionDetails";
import MatchDetails from "./MatchDetails/MatchDetails";
import { MatchesGrid, NoMatchesMessage, MatchCard } from "./MatchesList.styles";
import useSeeMore from "../../hooks/useSeeMore";
import SeeMoreButton from "../../ui-components/SeeMoreButton";
interface MatchesListProps {
  matches: Match[];
  message: string;
}

const MatchesList: React.FC<MatchesListProps> = ({ matches, message }) => {
  const minItemWidth = 600;
  const { visibleItems, handleSeeMore } = useSeeMore(
    matches.length,
    minItemWidth,
    3,
    15
  );
  return (
    <>
      {matches.length === 0 ? (
        <NoMatchesMessage>{message}</NoMatchesMessage>
      ) : (
        <>
          <MatchesGrid>
            {matches.slice(0, visibleItems).map((match) => (
              <MatchCard key={match.id}>
                <CompetitionDetails match={match} />
                <MatchDetails match={match} />
              </MatchCard>
            ))}
          </MatchesGrid>
          {visibleItems < matches.length && (
            <SeeMoreButton onClick={handleSeeMore} />
          )}
        </>
      )}
    </>
  );
};

export default MatchesList;
