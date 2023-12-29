import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import "./index.scss";
import { PlayersPage } from "./pages";
import { TeamsPage } from "./pages/TeamsPage";
import { TournamentsPage } from "./pages/TournamentsPage";
import { LoginPage } from "./pages/LoginPage";
import { BracketPage } from "./pages/BracketPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/players" />} />
        <Route index path="/players" element={<PlayersPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/tournaments" element={<TournamentsPage />} />
        <Route path="/bracket/:id" element={<BracketPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
}

export default App;
