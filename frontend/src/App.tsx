import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import CompetitionPage from "./pages/competition/CompetitionPage";
import MatchPage from "./pages/match/MatchPage";
import RegisterPage from "./pages/register/RegisterPage";
import TeamPage from "./pages/team/TeamPage";
import ProfilePage from "./pages/profile/ProfilePage";

import ExplorerPage from "./pages/explorer/ExplorerPage";
import Menu from "./ui-components/Menu/Menu";

const GlobalStyle = createGlobalStyle`
  body {
    font-family sans-serif;
    background-color: #1e1e1e;
    color: white;
    margin: 0;
  }
}`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 200px; /* Adjust to match the HeaderNavbarContainer width */
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppContainer>
          <Menu />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/league/:id" element={<CompetitionPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/match/:id" element={<MatchPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/team/:id" element={<TeamPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/explorer" element={<ExplorerPage />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
