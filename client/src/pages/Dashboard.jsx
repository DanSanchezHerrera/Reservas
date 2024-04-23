import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8000/api/reservations")
      .then(res => {
        setReservations(res.data);
        setLoaded(true);
        setError('');
      })
      .catch(err => {
        console.log('Error fetching data: ', err);
        setReservations([]);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      {loaded ? (
        <div>
          <h1>Lista de Reservas</h1>
          <ul>
            {reservations.map(reservation => (
              <li key={reservation._id}>
                <p>Fecha: {new Date(reservation.date).toLocaleDateString()}</p>
                <p>Hora: {reservation.time}</p>
                <p>Cancha: {reservation.courtNumber}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Dashboard;
