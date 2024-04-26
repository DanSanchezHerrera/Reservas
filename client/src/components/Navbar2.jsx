import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importa useNavigate aquí
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';
import usuario from '../assets/usuario.png';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#173F95'
    },  
  },
});

const Navbar2 = () => {
  const [name, setName] = useState(null);
  const navigate = useNavigate();  // Define navigate usando useNavigate

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
        .then(res => {
            setName(res.data.firstName);
        })
        .catch(err => {
            navigate("/");  // Ahora puedes usar navigate para redirigir
        });
  }, []);

  const logout = () => {
    axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
        .then(() => {
            navigate("/");
        })
        .catch(err => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <nav className={styles.navbar}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1>Reserva de piscinas</h1>
        <div className={styles.lista}>
        <ul className={styles.link}>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
        </div>
        <div className={styles.box}>
          <ul className={styles.link2}>
            <img src={usuario} alt="usuario" className={styles.usuario} />
              <li>{`¡Hola, ${name}!`}</li>  
              <button onClick={logout} className={styles.btn}>Cerrar Sesión</button>
          </ul>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default Navbar2;
