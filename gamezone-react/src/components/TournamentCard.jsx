function TournamentCard({ title, date, prize, rules }) {
  return (
    <article className="tournament-card">
      <h3>{title}</h3>
      <p><strong>Дата:</strong> {date}</p>
      <p><strong>Призовий фонд:</strong> {prize}</p>

      <ul>
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>

      <button>Зареєструватися</button>
    </article>
  );
}

export default TournamentCard;