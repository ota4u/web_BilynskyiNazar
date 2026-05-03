import PlayerStats from '../components/PlayerStats';
import CommentsSection from '../components/CommentsSection';

function ProfilePage() {
  return (
    <div>
      <h2>Мій профіль</h2>

      <div className="profile-container">
        <PlayerStats matches={120} wins={78} rank="Gold II" />

        <div className="profile-card">
          <h3>Історія ігор</h3>
          <ul>
            <li>CS2 — Перемога</li>
            <li>Dota 2 — Поразка</li>
            <li>Valorant — Перемога</li>
          </ul>
        </div>

        <div className="profile-card">
          <h3>Нагороди</h3>
          <ul>
            <li>🏆 Турнірний чемпіон</li>
            <li>🔥 10 перемог поспіль</li>
            <li>⭐ Топ-гравець місяця</li>
          </ul>
        </div>

        <div className="profile-card">
          <h3>Прогрес до наступної нагороди</h3>
          <div className="progress-container">
            <div className="progress-bar-fill"></div>
          </div>
          <p className="progress-text">До наступної нагороди залишилось 3 гри</p>
        </div>
      </div>

      <CommentsSection />
    </div>
  );
}

export default ProfilePage;