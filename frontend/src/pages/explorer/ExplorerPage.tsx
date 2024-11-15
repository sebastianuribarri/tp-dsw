// src/components/Explorer/Explorer.tsx
import React, { useState } from "react";
import Page from "../../ui-components/Page";
import SearchBar from "./SearchBar/SearchBar";
import CurrentCompetitionsList from "./CurrentCompetitionsList/CurrentCompetitionsList";
import AllTeamsList from "./AllTeamsList/AllTeamsList";
import DateMatchesList from "./DateMatchesList/DateMatchesList";
import SearchedMatchesList from "./SearchedMatchesList/SearchedMatchesList";

const Explorer: React.FC = () => {
  const [submittedSearch, setSubmittedSearch] = useState<string|undefined>(undefined);

  return (
    <Page>
      <SearchBar onSearch={setSubmittedSearch} />
      <CurrentCompetitionsList searchValue={submittedSearch} />
      <AllTeamsList searchValue={submittedSearch} />
      {submittedSearch ? (
        <SearchedMatchesList searchValue={submittedSearch} />
      ) : (
        <DateMatchesList />
      )}
    </Page>
  );
};

export default Explorer;
