// Explorer.tsx
import React from "react";
import Page from "../../ui-components/Page";
import CurrentCompetitionsList from "./CurrentCompetitionsList/CurrentCompetitionsList";
import AllTeamsList from "./AllTeamsList/AllTeamsList";
import DateMatchesList from "./DateMatchesList/DateMatchesList";

const Explorer: React.FC = () => {
  return (
    <Page>
      <CurrentCompetitionsList />
      <AllTeamsList />
      <DateMatchesList />
    </Page>
  );
};

export default Explorer;
