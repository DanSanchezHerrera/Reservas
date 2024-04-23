const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// This is where we import the Users routes function from our user.routes.js file
const AllMyUserRoutes = require("./routes/user.routes");
AllMyUserRoutes(app);

// Importar las rutas de reservas
const AllMyReservationRoutes = require("./routes/reservation.routes");
// Inicializar las rutas de reservas
AllMyReservationRoutes(app);


app.listen(8000, () => console.log("The server is all fired up on port 8000"));
