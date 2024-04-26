import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';
import usuario from '../assets/usuario.png';

const Navbar = () => {

  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

    return (
      <nav className={styles.navbar}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1>Reserva de piscinas</h1>
        <div className={styles.lista}>
        <ul className={styles.link}>
          <li><Link to="/">Home</Link></li>
        </ul>
        </div>
        <div className={styles.box}>
          <ul className={styles.link2}>
            <img src={usuario} alt="usuario" className={styles.usuario} />
            <li><Link to="/login">Iniciar sesión</Link></li>
          </ul>
          <button className={styles.btn} onClick={handleClick}>Regístrate</button>
          </div>
        </nav>
    );
  };
  

export default Navbar;