import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./context/AppDataContext";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import AnimeList from "./pages/AnimeList";
import AnimeDetailLayout from "./pages/AnimeDetailLayout";
import AnimeDetail from "./pages/AnimeDetail";

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
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AppDataProvider>
  );
}

export default App;
