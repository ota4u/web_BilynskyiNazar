import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import GameCard from '../components/GameCard';

function GamesPage() {
  const [games, setGames] = useState([]);
  const [favoriteGameIds, setFavoriteGameIds] = useState([]);
  const [showRecommended, setShowRecommended] = useState(true);
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    async function fetchGames() {
      try {
        const querySnapshot = await getDocs(collection(db, 'games'));
        const gamesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGames(gamesData);

        const shuffled = [...gamesData].sort(() => Math.random() - 0.5);
        setRecommendedGames(shuffled.slice(0, 3));

        for (const game of gamesData) {
          fetchAverageRating(game.id);
        }
      } catch (error) {
        console.error('Помилка завантаження ігор:', error);
      }
    }

    fetchGames();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  async function fetchAverageRating(gameId) {
    try {
      const response = await fetch(`https://web-bilynskyinazar.onrender.com/api/ratings/${gameId}`);
      const data = await response.json();

      setAverageRatings((prev) => ({
        ...prev,
        [gameId]: data.averageRating,
      }));
    } catch (error) {
      console.error('Помилка отримання середнього рейтингу:', error);
    }
  }

  function sortByRating() {
    const sortedGames = [...games].sort((a, b) => b.rating - a.rating);
    setGames(sortedGames);
  }

  function toggleFavorite(gameId) {
    setFavoriteGameIds((prevFavorites) => {
      if (prevFavorites.includes(gameId)) {
        return prevFavorites.filter((id) => id !== gameId);
      }
      return [...prevFavorites, gameId];
    });
  }

  function toggleRecommended() {
    setShowRecommended((prev) => !prev);
  }

  async function handleRateGame(gameId, stars) {
    if (!currentUser) return;

    try {
      await fetch('https://web-bilynskyinazar.onrender.com/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId,
          rating: stars,
          userEmail: currentUser.email,
        }),
      });

      setUserRatings((prevRatings) => ({
        ...prevRatings,
        [gameId]: stars,
      }));

      fetchAverageRating(gameId);
    } catch (error) {
      console.error('Помилка надсилання оцінки:', error);
    }
  }

  return (
    <div>
      <section className="recommended-section">
        <h2>Рекомендовані ігри</h2>
        <p>Список рекомендованих ігор генерується випадково при завантаженні сторінки.</p>

        <button className="toggle-btn" onClick={toggleRecommended}>
          {showRecommended ? 'Сховати рекомендації' : 'Показати рекомендації'}
        </button>

        {showRecommended && (
          <div className="games-container">
            {recommendedGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                genre={game.genre}
                rating={game.rating}
                players={game.players}
                image={game.image}
                isFavorite={favoriteGameIds.includes(game.id)}
                onToggleFavorite={toggleFavorite}
                isAuthenticated={!!currentUser}
                userRating={userRatings[game.id] || 0}
                averageRating={averageRatings[game.id] || 0}
                onRateGame={handleRateGame}
              />
            ))}
          </div>
        )}
      </section>

      <section className="games-section">
        <h2>Ігри</h2>
        <p>Оберіть гру та приєднуйтесь до тисяч гравців онлайн.</p>

        <button className="sort-btn" onClick={sortByRating}>
          Сортувати за рейтингом
        </button>

        <div className="games-container">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              genre={game.genre}
              rating={game.rating}
              players={game.players}
              image={game.image}
              isFavorite={favoriteGameIds.includes(game.id)}
              onToggleFavorite={toggleFavorite}
              isAuthenticated={!!currentUser}
              userRating={userRatings[game.id] || 0}
              averageRating={averageRatings[game.id] || 0}
              onRateGame={handleRateGame}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GamesPage;