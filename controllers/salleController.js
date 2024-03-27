const Reservation = require("../models/reservation");
const Salle = require("../models/salle");
const moment = require('moment');

exports.afficherListeSalles = async (req, res) => {
  try {
    // Récupérer toutes les salles du modèle
    const salles = await Salle.find();

    if (!salles || salles.length === 0) {
      // Si aucune salle n'existe, afficher un message
      return res.status(404).json({ message: "Aucune salle trouvée." });
    }
    // Envoyer la liste des salles
    res.status(200).json(salles);
  } catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de la liste des salles.",
    });
  }
};

// Rendre la page de liste des salles
exports.allsallePage = async (req, res) => {
  try {
    // Récupérer toutes les salles
    const salles = await Salle.find();
    // Rendre la page sallelist.ejs en passant les données des salles
    res.render("sallelist", { salles: salles });
  } catch (err) {
    // Gérer les erreurs
    res.status(404).send("Page Not Found !");
  }
};

exports.addSalle = async (req, res) => {
  try {
    const addSalle = req.body;
    let salle = await Salle.create(addSalle);
    res.json(salle);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Rendre la page de plus d'infos de salle
exports.salleDetailsPage = async (req, res) => {
  try {
    // Récupérer l'ID de la salle à partir des paramètres de la requête
    const salleId = req.params.id;
    // Récupérer la salle correspondante dans la base de données
    const salle = await Salle.findById(salleId);

    if (!salle) {
      // Si la salle n'existe pas, afficher un message d'erreur
      return res.status(404).json({ message: "Salle introuvable." });
    }

    // Récupérer les dates de réservation au format ISOString
    let resDateAndTime = await Reservation.distinct("dateReservation", {
      salle: salleId,
    });

    // Formater les dates de réservation dans le format souhaité (par exemple, YYYY-MM-DD HH:mm:ss)
    resDateAndTime = resDateAndTime.map(date => moment(date).format('DD-MM-YYYY'));

    // Rendre la page salleDetails.ejs en passant les données de la salle
    res.render("salleDetails", { salle: salle, resDateAndTime });
  } catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des informations de la salle.",
    });
  }
};

