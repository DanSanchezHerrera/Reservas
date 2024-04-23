import React from "react";
import { Button } from "@mui/material";

const ButtonComponent = ({onClick, text}) => {
    return (
        // The button will be red if the text is "Delete" and blue if it is "Reserve"
        (text === "Delete" 
            ? 
            <Button variant="contained" color="error" onClick={onClick}>{text}</Button> 
            :
            <Button variant="contained" color="primary" onClick={onClick}>{text}</Button>
        )
    )
}

export default ButtonComponent;