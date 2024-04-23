const Reservation = require("../models/reservation.model");

module.exports.findAllReservations = (req, res) => {
  Reservation.find()
    .populate('user')
    .then(allReservations => res.json({ reservations: allReservations }))
    .catch(err => res.status(400).json(err));
};

module.exports.findOneSingleReservation = (req, res) => {
  Reservation.findById(req.params.id)
    .then(oneReservation => res.json({ reservation: oneReservation }))
    .catch(err => res.status(400).json(err));
};

module.exports.createNewReservation = (req, res) => {
  Reservation.create(req.body)
    .then(newReservation => res.json({ reservation: newReservation }))
    .catch(err => res.status(400).json(err));
};

module.exports.updateExistingReservation = (req, res) => {
  Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(updatedReservation => res.json({ reservation: updatedReservation }))
    .catch(err => res.status(400).json(err));
};

module.exports.deleteAnExistingReservation = (req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(result => res.json({ result }))
    .catch(err => res.status(400).json(err));
};
