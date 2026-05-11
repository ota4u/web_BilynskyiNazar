function GameCard({
  id,
  title,
  genre,
  rating,
  players,
  image,
  isFavorite,
  onToggleFavorite,
  isAuthenticated,
  userRating,
  averageRating,
  onRateGame
}) {
  return (
    <article className={`game-card ${isFavorite ? 'favorite' : ''}`}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p><strong>Жанр:</strong> {genre}</p>
      <p><strong>Рейтинг гри:</strong> {rating} / 5</p>
      <p><strong>Середній рейтинг користувачів:</strong> {averageRating} / 5</p>
      <p><strong>Активних гравців:</strong> {players}</p>

      <button className="favorite-btn" onClick={() => onToggleFavorite(id)}>
        {isFavorite ? 'В улюблених' : 'Додати до улюблених'}
      </button>

      <div className="rating-block">
        <h4>Оцінка гри</h4>

        {isAuthenticated ? (
          <>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= userRating ? 'star active-star' : 'star'}
                  onClick={() => onRateGame(id, star)}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="rating-text">
              {userRating > 0
                ? `Ваша оцінка: ${userRating} з 5`
                : 'Оберіть оцінку від 1 до 5'}
            </p>
          </>
        ) : (
          <p className="rating-text">Щоб залишити оцінку, потрібно увійти в систему</p>
        )}
      </div>
    </article>
  );
}

export default GameCard;