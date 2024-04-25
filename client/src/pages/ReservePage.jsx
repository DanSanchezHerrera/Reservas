import React, { useEffect, useContext } from "react";
import FormComponent from "../components/FormComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import dayjs from 'dayjs';
import ButtonComponent from "../components/ButtonComponent";
import { ReservationsContext } from "../contexts/ReservationsContext";
import styles from './Reserve.module.css'

const ReservePage = () => {

    const navigate = useNavigate();
    const { reservations, setReservations } = useContext(ReservationsContext);

    //-----------------------------------SETTING THE CONTEXT-------------------------------------------------------------------

    // Getting the reservations made
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                // Asegúrate de que se incluya { withCredentials: true } para enviar las cookies de autenticación
                const res = await axios.get("http://localhost:8000/api/reservations", { withCredentials: true });
                const currentReservations = res.data.reservations;
                console.log("reservas",currentReservations);
                setReservations(currentReservations);
            } catch (err) {
                console.log(err);
            }
        };
        fetchReservations();
    }, []);
    
    
    //-----------------------------------FUNCTIONS FOR THE FORM-------------------------------------------------------------------

    // Function to handle the form submission
    const handleSubmit = (e, date, hour, lane) => {
        e.preventDefault()

        // Sending the reservation to the server
        axios.post("http://localhost:8000/api/reservations/new", {
            "date": date,
            "hour": hour.hour(),
            "lane": lane
        } , {withCredentials: true})
        .then(res => {
            console.log(res)
            // setReservations(prevReservations => [...prevReservations, res.data]);
            setReservations(prevReservations => [...prevReservations, res.data.reservation]);

        }) 
        .catch(err => console.log(err))
    }

    // Function to transform the date to the desired format
    const transformingDate = (date) => {
        return dayjs(date).format("YYYY-MM-DD");
    }


    // Function to handle the deletion of a reservation
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/reservations/delete/${id}`, {withCredentials: true})
        .then(res => {
            console.log(res)
            setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== id));
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.container2}>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <FormComponent  handleSubmit={handleSubmit} prevReservations={reservations}/>
                {reservations.map(reservation => {
                    return <div key={reservation._id}>
                        <p>
                        {transformingDate(reservation.date)} / {reservation.hour} / {reservation.lane}
                        </p>
                        <ButtonComponent onClick={(e) => navigate(`/update/${reservation._id}`)} text={"Update"}/>
                        <ButtonComponent onClick={(e) => { handleDelete(reservation._id) }} text={"Delete"}/>
                    </div>
                })}
        </Box>
        </div>
    )
}

export default ReservePage;
