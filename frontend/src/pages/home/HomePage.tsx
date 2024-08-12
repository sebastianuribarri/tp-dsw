import React from "react";
import FollowedTeamsSection from "./components/Teams";
import LiveMatches from "./components/LiveMatches";
import UpcomingMatches from "./components/UpcomingMathes";
import Page from "../../ui-components/Page";

const Homepage: React.FC = () => {
  return (
    <>
      <Page>
        <FollowedTeamsSection />
        <LiveMatches />
        <UpcomingMatches />
      </Page>
    </>
  );
};

export default Homepage;
