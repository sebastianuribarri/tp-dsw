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
import ProtectedRoute from "./ProtectedRoute";

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
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div<{ isMenuVisible: boolean }>`
  flex: 1;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    ${({ isMenuVisible }) =>
      isMenuVisible
        ? `
      margin-left: 200px; /* Ajusta este valor al ancho del menú */
    `
        : `
      margin-left: 0;
      justify-content: center;
    `}
  }
`;

function App() {
  const isLoggedIn = !!sessionStorage.getItem("authToken");
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppContainer>
          {isLoggedIn ? <Menu /> : <></>}
          <MainContent isMenuVisible={isLoggedIn}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/league/:id"
                element={
                  <ProtectedRoute>
                    <CompetitionPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/match/:id"
                element={
                  <ProtectedRoute>
                    <MatchPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/team/:id"
                element={
                  <ProtectedRoute>
                    <TeamPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explorer"
                element={
                  <ProtectedRoute>
                    <ExplorerPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MainContent>
        </AppContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
