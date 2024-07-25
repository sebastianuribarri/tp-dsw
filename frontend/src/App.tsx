import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import LeaguePage from "./pages/league/LeaguePage";
import MatchPage from "./pages/match/MatchPage";
import RegisterPage from "./pages/register/RegisterPage";
import TeamPage from "./pages/team/TeamPage";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/league/:id" element={<LeaguePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/team/:id" element={<TeamPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
