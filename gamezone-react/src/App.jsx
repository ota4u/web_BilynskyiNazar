import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

import GamesPage from './pages/GamesPage';
import TournamentsPage from './pages/TournamentsPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

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
              <li>
                <Link to="/auth">
                  {currentUser ? currentUser.email : 'Авторизація'}
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<GamesPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;