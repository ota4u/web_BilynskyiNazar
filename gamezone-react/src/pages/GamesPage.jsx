import { useState } from 'react';
import GameCard from '../components/GameCard';

function GamesPage() {
  const initialGames = [
    {
      id: 1,
      title: 'Counter Strike 2',
      genre: 'Шутер',
      rating: 4.8,
      players: '125 000',
      image: '/images/cs2.jpg',
    },
    {
      id: 2,
      title: 'Dota 2',
      genre: 'MOBA',
      rating: 4.6,
      players: '98 000',
      image: '/images/dota2.jpg',
    },
    {
      id: 3,
      title: 'Fortnite',
      genre: 'Королівська битва',
      rating: 4.5,
      players: '210 000',
      image: '/images/fortnite.jpg',
    },
    {
      id: 4,
      title: 'Valorant',
      genre: 'Тактичний шутер',
      rating: 4.7,
      players: '150 000',
      image: '/images/valorant.jpg',
    },
    {
      id: 5,
      title: 'Apex Legends',
      genre: 'Королівська битва',
      rating: 4.2,
      players: '50 000',
      image: '/images/APEX.jpg',
    },
    {
      id: 6,
      title: 'PUBG',
      genre: 'Королівська битва',
      rating: 4.4,
      players: '75 000',
      image: '/images/PUBG.jpg',
    },
  ];

  function getRandomGames(gamesArray, count) {
    const shuffled = [...gamesArray].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  const [games, setGames] = useState(initialGames);
  const [favoriteGameIds, setFavoriteGameIds] = useState([]);
  const [showRecommended, setShowRecommended] = useState(true);
  const [recommendedGames] = useState(getRandomGames(initialGames, 3));

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

  return (
    <div>
      <section className="recommended-section">
        <h2>Рекомендовані ігри</h2>
        <p>Список рекомендованих ігор генерується випадково при кожному оновленні сторінки.</p>

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
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GamesPage;