const Reservation = require("../models/reservation.model");

module.exports.findAllReservations = (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "User ID not provided" });
  }
  Reservation.find({ user: req.userId })
    .select('-user.password -user.sensitiveData') // Exclude sensitive user data
    .then(allReservations => res.json({ reservations: allReservations }))
    .catch(err => res.status(400).json(err));
};

module.exports.findOneSingleReservation = (req, res) => {
  Reservation.find({ user: req.userId }) // Cambiado de findById a find por userId
    .select('date status')
    .then(reservations => res.json({ reservations }))
    .catch(err => res.status(400).json(err));
};

module.exports.createNewReservation = (req, res) => {
  const userId = req.userId; // Obtener el ID del usuario desde la autenticación
  Reservation.create({
    ...req.body,
    user: userId  // Asignar el usuario a la reserva
  })
  .then(newReservation => res.json({ reservation: newReservation }))
  .catch(err => res.status(400).json(err));
};

module.exports.updateExistingReservation = (req, res) => {
  Reservation.findByIdAndUpdate(req.params.id, { ...req.body, user: req.userId }, { new: true, runValidators: true })
    .then(updatedReservation => res.json({ reservation: updatedReservation }))
    .catch(err => res.status(400).json(err));
};

module.exports.deleteAnExistingReservation = (req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(result => res.json({ result }))
    .catch(err => res.status(400).json(err));
};
