import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TextField, Typography, FormControl, Button, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const FormComponent = ({handleSubmit, prevReservation, prevReservations }) => {

    // Reservations attributes
    const [date, setDate] = useState(null);
    const [hour, setHour] = useState(dayjs());
    const [lane, setLane] = useState("");

    // Setting min and max hours for the reservation
    const maxHour = dayjs().hour(20).minute(0);
    const minHour = dayjs().hour(5).minute(0);

    // Setting the validation states
    const [hourValidation, setHourValidation] = useState(false);
    const [formReset, setFormReset] = useState(false);

    // Filling the form with the previous state in case of an update
    useEffect(() => {

        if (!prevReservation) return

        setHourValidation(true)
        setDate(dayjs(prevReservation.date));
        setHour(dayjs().hour(prevReservation.hour).minute(0).second(0));
        setLane(prevReservation.lane);

    }, [prevReservation]);

//-----------------------------------FUNCTIONS FOR VALIDATIONS-------------------------------------------------------------------

    // Disabling weekends
    const weekendsDisabled = (date) => {
        const day = date.day();
        return day === 0 || day === 6;
    };

    // Disabling months that are two months after the current date
    const monthsDisabled = (date) => {

        if (date.date() === 25) {
            return date.isAfter(dayjs().add(1, 'month'), 'month');
        }

        return date.isAfter(dayjs(), 'month');
    };

    // Validating the form
    const validateForm = () => {
        return date && hour && lane
    };

//-----------------------------------FUNCTIONS FOR HANDLING THE FORM-------------------------------------------------------------

    // Handling the date change
    const handleDate = (newDate) => {
        setDate(newDate);
        (newDate.isAfter(dayjs())) ? setHourValidation(true) : setHourValidation(false);
    }

    // Function to check if a lane has reached its maximum reservations
    const isLaneFull = (laneId) => {

        const laneReservations = prevReservations.filter(reservation => {
            return (
                dayjs(reservation.date).year() === dayjs(date).year() && // Compare the year of the dates
                dayjs(reservation.date).month() + 1 === dayjs(date).month() + 1 && // Compare the month of the dates
                dayjs(reservation.date).date() === dayjs(date).date() && // Compare the day of the dates
                parseInt(reservation.hour) === hour.hour() && // Compare the hour
                laneId === reservation.lane
            )
        })
    
        return laneReservations.length >= 3
    }

    // Rendering the lane options
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

//-----------------------------------FUNCTION FOR RESETING THE FORM-------------------------------------------------------------

    useEffect(() => {
        if (formReset) {
            setDate(null);
            setHour(dayjs());
            setLane("");
            setFormReset(false);
        }
    }, [formReset]);

//-----------------------------------RETURNING THE FORM COMPONENT---------------------------------------------------------------

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={(e) => { handleSubmit(e, date, hour, lane); setFormReset(true) }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Typography variant="h6" style={{ color: "#1A73E8", fontWeight: "bold" }}>MAKE YOUR RESERVATION</Typography>
                <FormControl>
                <Box mb={6}><InputLabel>Which day would you like to practice?</InputLabel></Box>                    
                    <DatePicker
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
                    <InputLabel>At what time can you practice?</InputLabel>
                    <Box mt={6} sx={{ display: "flex", flexDirection: "row", gap: 4 }}>                   
                        <TimeClock 
                            defaultValue={maxHour} value={hour} ampm={false} views={['hours']} disablePast={!hourValidation} 
                            onChange={(newHour) => setHour(newHour)} maxTime={maxHour} minTime={minHour}
                        />
                    </Box>
                </FormControl>
                <FormControl>
                    <InputLabel>Select the lane</InputLabel>               
                    <Select label="Select the lane" value={lane} onChange={(e) => setLane(e.target.value)}>
                        {renderLaneOptions()}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" disabled={!validateForm()}
                style={{
                    backgroundColor: validateForm() ? "#1A73E8" : "gray", color: "white", fontWeight: "bold",
                }}>Reserve</Button>
            </Box>
        </form>
        </LocalizationProvider>
    )
}

export default FormComponent;