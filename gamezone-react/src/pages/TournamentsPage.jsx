import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import TournamentCard from '../components/TournamentCard';

function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const querySnapshot = await getDocs(collection(db, 'tournaments'));
        const tournamentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTournaments(tournamentsData);
      } catch (error) {
        console.error('Помилка завантаження турнірів:', error);
      }
    }

    fetchTournaments();
  }, []);

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
            rules={['Інформація завантажена з Firebase']}
          />
        ))}
      </div>
    </div>
  );
}

export default TournamentsPage;