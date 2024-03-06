
// Rendre la page de liste des salles
exports.reservationPage = async (req, res) => {
    try {
        // Rendre la page sallelist.ejs en passant les données des salles
        res.render("reservation.ejs");
    } catch (err) {
        // Gérer les erreurs
        res.status(404).send("Page Not Found !");
    }
};