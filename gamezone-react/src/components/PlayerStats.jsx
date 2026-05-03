function PlayerStats({ matches, wins, rank }) {
  return (
    <div className="profile-card">
      <h3>Статистика</h3>
      <p>Зіграно матчів: {matches}</p>
      <p>Перемог: {wins}</p>
      <p>Рейтинг: {rank}</p>
    </div>
  );
}

export default PlayerStats;