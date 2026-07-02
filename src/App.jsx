import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./context/AppDataContext";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import AnimeList from "./pages/AnimeList";
import AnimeDetailLayout from "./pages/AnimeDetailLayout";
import AnimeDetail from "./pages/AnimeDetail";
import AnimeCharacters from "./pages/AnimeCharacters";
import CharactersList from "./pages/CharactersList";
import CharacterProfile from "./pages/CharacterProfile";

function App() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/anime" element={<AnimeList />} />

            {/* nested */}
            <Route path="/anime/:id" element={<AnimeDetailLayout />}>
              <Route index element={<AnimeDetail />} />
              <Route path="characters" element={<AnimeCharacters />} />
            </Route>

            <Route path="/characters" element={<CharactersList />} />
            <Route path="/characters/:id" element={<CharacterProfile />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AppDataProvider>
  );
}

export default App;
