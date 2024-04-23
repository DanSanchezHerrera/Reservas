import { useState, createContext } from "react";

const ReservationsContext = createContext();

const ReservationsProvider = ({ children }) => {
    
    const [reservations, setReservations] = useState([]);
    
    return (
        <ReservationsContext.Provider value={{ reservations, setReservations }}>
            {children}
        </ReservationsContext.Provider>
    )
}

export { ReservationsProvider, ReservationsContext };