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
import ProtectedRoute from "./ProtectedRoute";
import CalendarView from "./pages/calendar/Calendar";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    background-color: #1e1e1e;
    color: white;
    margin: 0;
  }
}`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row; /* Layout horizontal por defecto */

  @media (max-width: 767px) {
    flex-direction: column; /* Cambia a columna en dispositivos móviles */
  }
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;

  @media (max-width: 767px) {
    margin-left: 0; /* Sin margen en dispositivos móviles */
    margin-bottom: 60px; /* Espacio para el Navbar inferior */
  }
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppContainer>
          <MainContent>
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
              <Route
                path="/calendar/"
                element={
                  <ProtectedRoute>
                    <CalendarView />
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
