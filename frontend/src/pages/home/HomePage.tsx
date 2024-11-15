import React from "react";
import FollowedTeams from "./components/FollowedTeams";
import LiveMatches from "./components/LiveMatches";
import UpcomingMatches from "./components/UpcomingMathes";

import PageContent from "../../ui-components/PageContent";

const Homepage: React.FC = () => {
  return (
    <>
      <PageContent>
        <FollowedTeams />
        <LiveMatches />
        <UpcomingMatches />
      </PageContent>
    </>
  );
};

export default Homepage;
