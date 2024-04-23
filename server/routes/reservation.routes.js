const ReservationController = require("../controllers/reservation.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/reservations", authenticate, ReservationController.findAllReservations);
  app.get("/api/reservations/:id", authenticate, ReservationController.findOneSingleReservation);
  app.post("/api/reservations/new", authenticate, ReservationController.createNewReservation);
  app.put("/api/reservations/update/:id", authenticate, ReservationController.updateExistingReservation);
  app.delete("/api/reservations/delete/:id", authenticate, ReservationController.deleteAnExistingReservation);
};
