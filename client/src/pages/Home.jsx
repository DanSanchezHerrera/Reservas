import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'react-bootstrap';
import pool from '../assets/pool.png'
import pool1 from '../assets/pool1.png'
import pool2 from '../assets/pool2.png'
import Button from '@mui/material/Button';
import agregar from '../assets/agregar.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const theme = createTheme({
    palette: {
        primary: {
        main: '#173F95'
    },  
    },
});

const Home = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
    <ThemeProvider theme={theme}>
    <div className={styles.container1}>
        

        <div className={styles.box}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pool}
            alt="Piscina"
            />
        <Carousel.Caption>
            <h3>¡Reserva Ya!</h3>
            <p>Piscinas olímpicas a una reserva de distancia.</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pool1}
            alt="Piscina"
            />
        <Carousel.Caption>
            <h3>¡Reserva Ya!</h3>
            <p>Elije una pista y reserva en el horario que más te convenga.</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pool2}
            alt="Piscina"
            />
        <Carousel.Caption>
            <h3>¡Reserva Ya!</h3>
            <p>Equipamiento olímpico para todas tus necesidades.</p>
        </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
        <br />
        </div>
    </div>
    </ThemeProvider>
    );
};

export default Home;
