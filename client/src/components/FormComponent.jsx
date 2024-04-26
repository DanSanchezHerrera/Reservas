import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TextField, Typography, FormControl, Button, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styles from './Form.module.css'
import { useNavigate } from 'react-router-dom';

const FormComponent = ({handleSubmit, prevReservation, prevReservations }) => {

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/dashboard'); 
    };

    const [date, setDate] = useState(null);
    const [hour, setHour] = useState(dayjs());
    const [lane, setLane] = useState("");

    const maxHour = dayjs().hour(20).minute(0);
    const minHour = dayjs().hour(5).minute(0);

    const [hourValidation, setHourValidation] = useState(false);
    const [formReset, setFormReset] = useState(false);

    useEffect(() => {

        if (!prevReservation) return

        setHourValidation(true)
        setDate(dayjs(prevReservation.date));
        setHour(dayjs().hour(prevReservation.hour).minute(0).second(0));
        setLane(prevReservation.lane);

    }, [prevReservation]);

    const weekendsDisabled = (date) => {
        const day = date.day();
        return day === 0 || day === 6;
    };

    const monthsDisabled = (date) => {

        if (date.date() === 25) {
            return date.isAfter(dayjs().add(1, 'month'), 'month');
        }

        return date.isAfter(dayjs(), 'month');
    };

    const validateForm = () => {
        return date && hour && lane
    };

    const handleDate = (newDate) => {
        setDate(newDate);
        (newDate.isAfter(dayjs())) ? setHourValidation(true) : setHourValidation(false);
    }

    const isLaneFull = (laneId) => {

        const laneReservations = prevReservations.filter(reservation => {
            return (
                dayjs(reservation.date).year() === dayjs(date).year() && 
                dayjs(reservation.date).month() + 1 === dayjs(date).month() + 1 && 
                dayjs(reservation.date).date() === dayjs(date).date() && 
                parseInt(reservation.hour) === hour.hour() && 
                laneId === reservation.lane
            )
        })
    
        return laneReservations.length >= 3
    }

    const renderLaneOptions = () => {
        const lanes = [];
        for (let i = 1; i <= 10; i++) {
            const isFull = isLaneFull(i)
            lanes.push(
            <MenuItem key={i} value={(i)} disabled={isFull}>
                Lane {i}
            </MenuItem>
            )
        }
        return lanes;
    };

    useEffect(() => {
        if (formReset) {
            setDate(null);
            setHour(dayjs());
            setLane("");
            setFormReset(false);
        }
    }, [formReset]);

    return (
        <div className={styles.container}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.box}>
                <form onSubmit={(e) => { handleSubmit(e, date, hour, lane); setFormReset(true) }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <h6>Reserva Aquí</h6>
                        <FormControl>
                        <Box mb={6}><InputLabel className={styles.input}>Selecciona fecha:</InputLabel></Box>                    
                            <DatePicker
                                className={styles.grid}
                                value={date}
                                disablePast
                                shouldDisableDate={weekendsDisabled}
                                shouldDisableMonth={monthsDisabled}
                                onChange={(newDate) => {
                                    handleDate(newDate);
                                }}
                                style={{border: "1px solid #212121" }}
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel className={styles.input}>Elige un bloque horario: *</InputLabel>
                            <Box mt={6} sx={{ display: "flex", flexDirection: "row", gap: 4 }}>                   
                                <TimeClock 
                                    defaultValue={maxHour} value={hour} ampm={false} views={['hours']} disablePast={!hourValidation} 
                                    onChange={(newHour) => setHour(newHour)} maxTime={maxHour} minTime={minHour}
                                />
                            </Box>
                        </FormControl>
                        <InputLabel className={styles.input}>Seleciona una pista:</InputLabel>
                        <FormControl className={styles.grid}>
                            <InputLabel>Selecciona una pista</InputLabel>               
                            <Select label="Select the lane" value={lane} onChange={(e) => setLane(e.target.value)}>
                                {renderLaneOptions()}
                            </Select>
                        </FormControl>
                        <h5>* no es necesario seleccionar minutos</h5>
                        <div className={styles.box2}>
                            <button className={styles.boton} type="submit" disabled={!validateForm()}>
                                Reserva
                            </button>
                            <button className={styles.boton} onClick={handleCancel}>
                                Cancelar
                            </button>
                        </div>
                    </Box>
                </form>
            </div>
        </LocalizationProvider>
        </div>
    )
}

export default FormComponent;