// src/components/Explorer/Explorer.tsx
import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import CurrentCompetitionsList from "./CurrentCompetitionsList/CurrentCompetitionsList";
import AllTeamsList from "./AllTeamsList/AllTeamsList";
import DateMatchesList from "./DateMatchesList/DateMatchesList";
import SearchedMatchesList from "./SearchedMatchesList/SearchedMatchesList";
import PageContent from "../../ui-components/PageContent";

const Explorer: React.FC = () => {
  const [submittedSearch, setSubmittedSearch] = useState<string | undefined>(
    undefined
  );

  return (
    <PageContent>
      <SearchBar onSearch={setSubmittedSearch} />
      <CurrentCompetitionsList searchValue={submittedSearch} />
      <AllTeamsList searchValue={submittedSearch} />
      {submittedSearch ? (
        <SearchedMatchesList searchValue={submittedSearch} />
      ) : (
        <DateMatchesList />
      )}
    </PageContent>
  );
};

export default Explorer;
