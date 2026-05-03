function GameCard({ id, title, genre, rating, players, image, isFavorite, onToggleFavorite }) {
  return (
    <article className={`game-card ${isFavorite ? 'favorite' : ''}`}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p><strong>Жанр:</strong> {genre}</p>
      <p><strong>Рейтинг:</strong> {rating} / 5</p>
      <p><strong>Активних гравців:</strong> {players}</p>

      <button className="favorite-btn" onClick={() => onToggleFavorite(id)}>
        {isFavorite ? 'В улюблених' : 'Додати до улюблених'}
      </button>
    </article>
  );
}

export default GameCard;