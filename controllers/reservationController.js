const Reservation = require("../models/reservation");
// Ajouter une réservation
exports.addReservation = async (req, res) => {
  try {
    const salleId = req.params.id; // Récupérer l'ID de la salle depuis l'URL
    // L'utilisateur authentifié est accessible via req.user
    const currentUser = req.userId;
    // Créez une nouvelle réservation en utilisant les données de la requête

    const dateRes = req.body.dateReservation;

    const isDateSaved = await Reservation.findOne({
      salle: salleId,
      dateReservation: dateRes,
    });

    if (!isDateSaved) {
      const reservation = new Reservation({
        salle: salleId,
        utilisateur: currentUser,
        dateReservation: dateRes,
      });
      await reservation.save();
      res.status(201).send({
        message: "Reservation added successfully",
        reservation: reservation,
      });
    } else {
      res.status(400).send("date alrady in use");
    }
  } catch (err) {
    console.error(err); // Afficher l'erreur dans la console pour le débogage
    res.status(500).send("Internal Server Error");
  }
};

// Rendre la page de liste des salles
exports.reservationPage = async (req, res) => {
  try {
    // Rendre la page sallelist.ejs en passant les données des salles
    res.render("reservation");
  } catch (err) {
    // Gérer les erreurs
    res.status(404).send("Page Not Found !");
  }
};
