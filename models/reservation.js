const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    salle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salle',
        required: true
    },
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateReservation: {
        type: Date,
        required: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;