import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./ui-components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import LeaguePage from "./pages/league/LeaguePage";
import MatchPage from "./pages/match/MatchPage";
import RegisterPage from "./pages/register/RegisterPage";
import TeamPage from "./pages/team/TeamPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Header from "./ui-components/Header";
import ExplorerPage from "./pages/explorer/ExplorerPage";

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

const HeaderNavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: column;
    width: 200px; /* Adjust width as needed */
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #333; /* Ensure the background color matches your theme */
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
          <HeaderNavbarContainer>
            <Header title="TodoFulbo" />
            <Navbar />
          </HeaderNavbarContainer>
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/league/:id" element={<LeaguePage />} />
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
