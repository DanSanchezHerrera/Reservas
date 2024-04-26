import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../components/Navbar2.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
      primary: {
      main: '#173F95'
  },  
  },
});


const Dashboard = () => {
  const [name, setName] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
        .then(res => {
            setName(res.data.firstName);
        })
        .catch(err => {
            navigate("/");
        });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/reservations", { withCredentials: true })
      .then(res => {
        if (res.data && res.data.reservations) {
          setReservations(res.data.reservations);
          setLoaded(true);
        }
      })
      .catch(err => {
        setError(err.message);
        setLoaded(true);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/reservations/delete/${id}`, { withCredentials: true })
      .then(() => {
        setReservations(reservations.filter(reservation => reservation._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleUpdateClick = (id) => {
    navigate(`/update/${id}`);
  };

  const handleClick = () => {
    navigate('/reserve');
  };

  return (
    <ThemeProvider theme={theme}>
    <div>
      <Navbar2 />
      <div className={styles.reserva}>
        <Button onClick={handleClick} 
        variant="contained" 
        endIcon={<CalendarMonthIcon />} 
        style={{ width: '200px', height: '50px' }}>
          Reserva Aquí
        </Button>
      </div>
      {loaded ? (
        reservations.length > 0 ? (
          <div className={styles.box}>
            <h1>Lista de Reservas</h1>
            <table className={styles.reservationTable}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Pista</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(reservation => (
                  <tr key={reservation._id}>
                    <td>{new Date(reservation.date).toLocaleDateString()}</td>
                    <td>{reservation.hour}:00</td>
                    <td>{reservation.lane}</td>
                    <td>
                      <button onClick={() => handleUpdateClick(reservation._id)} className={styles.actionbutton}>Modificar</button>
                      <button onClick={() => handleDelete(reservation._id)} className={styles.actionbutton}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Actualmente no posees ninguna reserva.</p>
        )
      ) : (
        <p>Cargando...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
    </ThemeProvider>
  );
};

export default Dashboard;