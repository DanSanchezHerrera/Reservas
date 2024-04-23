import React, { useContext } from "react";
import FormComponent from "../components/FormComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReservationsContext } from "../contexts/ReservationsContext";
import styles from './Reserve.module.css'

const UpdatePage = () => {

    const { id } = useParams();
    const { reservations } = useContext(ReservationsContext);

    // Getting the reservation to update
    const reservation = reservations.find(reservation => reservation._id === id);

    // Function to handle the form submission
    const handleSubmit = (e, date, hour, lane) => {
        e.preventDefault()
        console.log(date)
        console.log(date.year(), date.month() + 1, date.date(), hour.hour(), lane)

        // Sending the reservation to the server
        axios.put(`http://localhost:8000/api/reservations/update/${id}`, {
            "date": date,
            "hour": hour.hour(),
            "lane": lane
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    
    return (
        <div className={styles.container2}>
        <FormComponent prevReservation={reservation} prevReservations={reservations} handleSubmit={handleSubmit}/>
        </div>
    )
}

export default UpdatePage;