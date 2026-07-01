import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import AnimeList from "./pages/AnimeList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/anime" element={<AnimeList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
