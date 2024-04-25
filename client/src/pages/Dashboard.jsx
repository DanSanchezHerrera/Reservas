import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState(null)
  const [reservations, setReservations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
        .then(res => {
            console.log(res)
            setName(res.data.firstName)
        })
        .catch(err => {
            console.log(err)
            navigate("/")
        })
}, [])

  useEffect(() => {
    axios.get("http://localhost:8000/api/reservations", {withCredentials: true})
      .then(res => {
        setReservations(res.data.reservations);  // Asegúrate de usar la propiedad correcta
        console.log("reservas", res.data.reservations);
        setLoaded(true);
        setError('');
      })
      .catch(err => {
        console.log('Error fetching data: ', err);
        setReservations([]);  // Establece reservaciones a un arreglo vacío en caso de error
        setError(err.message);
      });
  }, []);

  

  const logout = () => {
    axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => console.log(err))

}

  return (
    <div>
      <h2>Hola {name}!</h2>
      <div className={styles.reserva}>
                 <Button variant="contained" endIcon={<CalendarMonthIcon />} style={{ width: '200px', height: '50px' }}>
                     <Link to="/reserve">Reserva Aquí</Link>
                 </Button>
             </div>
      {loaded ? (
        reservations.length > 0 ? (
          <div>
            <h1>Lista de Reservas</h1>
            <ul>
              {reservations.map(reservation => (
                <li key={reservation._id}>
                  <p>Fecha: {new Date(reservation.date).toLocaleDateString()}</p>
                  <p>Hora: {reservation.hour}:00 </p>
                  <p>Pista: {reservation.lane}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Actualmente no posees ninguna reserva.</p>
        )
      ) : (
        <p>Cargando...</p>
      )}
      {error && <p>Error: {error}</p>}
      <button onClick={logout}>Logout</button>

    </div>
    
  );
};

export default Dashboard;