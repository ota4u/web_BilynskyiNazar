import TournamentCard from '../components/TournamentCard';

function TournamentsPage() {
  const tournaments = [
    {
      id: 1,
      title: 'CS2 Weekly Cup',
      date: '28 лютого 2026',
      prize: '500$',
      rules: ['Мінімальний рівень: 10', 'Команди 5x5'],
    },
    {
      id: 2,
      title: 'Dota 2 Pro League',
      date: '5 березня 2026',
      prize: '1000$',
      rules: ['Тільки рейтингові гравці', 'Double Elimination'],
    },
  ];

  return (
    <div>
      <h2>Турніри</h2>
      <p>Актуальні змагання та можливість реєстрації.</p>

      <div className="tournaments-container">
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            title={tournament.title}
            date={tournament.date}
            prize={tournament.prize}
            rules={tournament.rules}
          />
        ))}
      </div>
    </div>
  );
}

export default TournamentsPage;