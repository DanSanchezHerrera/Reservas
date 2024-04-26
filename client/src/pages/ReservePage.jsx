import React, { useEffect, useContext } from "react";
import FormComponent from "../components/FormComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import dayjs from 'dayjs';
import ButtonComponent from "../components/ButtonComponent";
import { ReservationsContext } from "../contexts/ReservationsContext";
import styles from './Reserve.module.css'
import Navbar2 from "../components/Navbar2";

const ReservePage = () => {

    const navigate = useNavigate();
    const { reservations, setReservations } = useContext(ReservationsContext);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
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
    
    const handleSubmit = (e, date, hour, lane) => {
        e.preventDefault()

        axios.post("http://localhost:8000/api/reservations/new", {
            "date": date,
            "hour": hour.hour(),
            "lane": lane
        } , {withCredentials: true})
        .then(res => {
            console.log(res)
            setReservations(prevReservations => [...prevReservations, res.data.reservation]);

        }) 
        .catch(err => console.log(err))
    }

    const transformingDate = (date) => {
        return dayjs(date).format("YYYY-MM-DD");
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/reservations/delete/${id}`, {withCredentials: true})
        .then(res => {
            console.log(res)
            setReservations(prevReservations => prevReservations.filter(reservation => reservation._id !== id));
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
        <Navbar2 />
        <div className={styles.boxes}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                    <FormComponent  handleSubmit={handleSubmit} prevReservations={reservations}/>
            </Box>
        </div>
        </div>
    )
}

export default ReservePage;
