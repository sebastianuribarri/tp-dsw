import React from "react";
import FollowedTeams from "./components/FollowedTeams";
import LiveMatches from "./components/LiveMatches";
import UpcomingMatches from "./components/UpcomingMathes";
import Page from "../../ui-components/Page";

const Homepage: React.FC = () => {
  return (
    <>
      <Page>
        <FollowedTeams />
        <LiveMatches />
        <UpcomingMatches />
      </Page>
    </>
  );
};

export default Homepage;
