const Reservation = require("../models/reservation");
const nodeMailer = require("nodemailer");
const Salle = require("../models/salle");
require("dotenv").config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

///Rendring Pages
//Edit Reservation Page
exports.editReservationPage = async (req, res) => {
  try {
    const resId = req.params.id;
    const reservation = await Reservation.findById(resId).populate("salle");
    res.render("editReservation", { reservation: reservation });
  } catch (err) {
    res.status(404).send("Page Not Found !");
  }
};

//user reservations list page
exports.userReservationsPage = async (req, res) => {
  const currentUser = req.userId;
  const userRes = await Reservation.find({
    utilisateur: currentUser,
  }).populate("salle");
  try {
    res.render("userReservationsList", { user: currentUser, res: userRes });
  } catch (err) {
    res.status(404).send("Page Not Found!");
  }
};

///Reservations CRUD
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
      res.status(201).redirect("/myrerservations");
    } else {
      res.send("date already in use");
    }
  } catch (err) {
    console.error(err); // Afficher l'erreur dans la console pour le débogage
    res.status(500).send("Internal Server Error");
  }
};

//Modifier Reservation
exports.editReservation = async (req, res) => {
  try {
    const resId = req.params.id;
    const recemail = req.userEmail;
    const newDate = new Date(req.body.dateReservation);
    const oldReservation = await Reservation.findById(resId).populate("salle");

    const updateReservation = await Reservation.findByIdAndUpdate(resId, {
      $set: {
        dateReservation: newDate,
      },
    });
    await sendUpdateMail(recemail, oldReservation, newDate);
    res.redirect("/myrerservations");
  } catch (err) {
    console.log(err.message);
  }
};

//Annuler Reservation
exports.removeReservation = async (req, res) => {
  try {
    const resId = req.body.reservationId;
    const recemail = req.userEmail;
    const canceledResInfo = await Reservation.findById(resId).populate("salle");
    await sendCancelMail(recemail, canceledResInfo);
    await Reservation.findByIdAndDelete(resId);
    res.redirect("/myrerservations");
  } catch (err) {
    console.log(err);
  }
};

////Mailing Functions
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
      "fr-FR",
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

//Envoyer Mail de Annulation
const sendCancelMail = async (recemail, canceledResInfo) => {
  try {
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    const formattedDate = canceledResInfo.dateReservation.toLocaleDateString(
      "fr-FR",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    let mailOption = {
      from: email,
      to: recemail,
      subject: "Confirmation d'Annulation de reservation",
      html: `<p> <b> Bonjour , <b> </p>
          <p> Votre Réservation Pour la Salle : <b> ${canceledResInfo.salle.name} </b>  <br> Du date : <b> ${formattedDate} <br>
            </b> a été Annuler </p>
          <p>  <b> Merci ! </b> </p>`,
    };
    await transporter.sendMail(mailOption);
  } catch (err) {
    console.log(err.message);
  }
};

//Envoyer Mail De Modification
const sendUpdateMail = async (recemail, oldReservation, newDate) => {
  try {
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    const formattedOldDate = oldReservation.dateReservation.toLocaleDateString(
      "fr-FR",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    const formattedNewDate = newDate.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    let mailOption = {
      from: email,
      to: recemail,
      subject: "Confirmation de Modification du date de reservation",
      html: `<p> <b> Bonjour , <b> </p>
          <p> Votre Date de reservation a été Modifier Pour la Salle : <b> ${oldReservation.salle.name} </b>  <br> Ancien date : <b> ${formattedOldDate} </b> <br>
            </b> Nouvelle Date : <b> ${formattedNewDate} </p>
          <p>  <b> Merci ! </b> </p>`,
    };
    await transporter.sendMail(mailOption);
  } catch (err) {
    console.log(err.message);
  }
};
