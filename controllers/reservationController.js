const Reservation = require("../models/reservation");
const nodeMailer = require("nodemailer");
const Salle = require("../models/salle");
require("dotenv").config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

//Envoyer Mail de confirmation
const sendConfMail = async (recemail, reservationDetails) => {
  try {
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    const formattedDate = reservationDetails.dateReservation.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    let mailOption = {
      from: email,
      to: recemail,
      subject: "Confirmation de Reservation",
      html: `<p> <b> Bonjour , <b> </p>
          <p>Votre Réservation a été mis avec success</p>
          <p>  <b> Room Number : </b> ${reservationDetails.salle} </p>
          <p> <b> Date: </b> ${formattedDate}</p>
          <p>  <b> Merci ! </b> </p>`,
    };
    await transporter.sendMail(mailOption);
  } catch (err) {
    console.log(err.message);
  }
};
// Ajouter une réservation
exports.addReservation = async (req, res) => {
  try {
    const salleId = req.params.id; // Récupérer l'ID de la salle depuis l'URL
    // L'utilisateur authentifié est accessible via req.user
    const currentUser = req.userId;
    const recemail = req.userEmail;
    // Créez une nouvelle réservation en utilisant les données de la requête
    const dateRes = new Date(req.body.dateReservation);
    const currDate = new Date();
    //check if the date is already reserved
    const isDateSaved = await Reservation.findOne({
      salle: salleId,
      dateReservation: dateRes,
    });
    const reservation = new Reservation({
      salle: salleId,
      utilisateur: currentUser,
      dateReservation: dateRes,
    });
    if (!isDateSaved && dateRes >= currDate) {
      await reservation.save();
      const salle = await Salle.findById(salleId);
      const reservationDetails = {
        salle: salle.name,
        dateReservation: dateRes,
      };
      await sendConfMail(recemail, reservationDetails);
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
