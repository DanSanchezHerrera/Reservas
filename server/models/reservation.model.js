const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ReservationSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    lane: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
