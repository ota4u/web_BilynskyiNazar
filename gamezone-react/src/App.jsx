import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import GamesPage from './pages/GamesPage';
import TournamentsPage from './pages/TournamentsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <h1>GameZone</h1>

          <nav>
            <ul className="nav-list">
              <li><Link to="/">Ігри</Link></li>
              <li><Link to="/tournaments">Турніри</Link></li>
              <li><Link to="/profile">Мій профіль</Link></li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<GamesPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;