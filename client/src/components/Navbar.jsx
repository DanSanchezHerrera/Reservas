import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';
import usuario from '../assets/usuario.png';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#173F95'
    },  
  },
});

const Navbar = ({ isAuthenticated }) => {
    return (
      <ThemeProvider theme={theme}>
        <nav className={styles.navbar}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1>Reserva de piscinas</h1>
          <div className={styles.lista}>
          <ul className={styles.link}>
            <li><Link to="/">Home</Link></li>
            {isAuthenticated && (
              <>
                <li><Link to="/link1">Link 1</Link></li>
                <li><Link to="/link2">Link 2</Link></li>
                <li><Link to="/link3">Link 3</Link></li>
              </>
            )}
          </ul>
          </div>
          <div className={styles.box}>
            <ul className={styles.link2}>
              <img src={usuario} alt="usuario" className={styles.usuario} />
              <li><Link to="/login">Iniciar sesión</Link></li>
            </ul>
            <Button color="primary" variant="contained"><Link to="/register">Registrarse</Link></Button>
          </div>
        </nav>
      </ThemeProvider>
    );
  };
  

export default Navbar;
