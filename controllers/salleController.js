const Salle = require('../models/salle');
exports.afficherListeSalles = async (req, res) => {
    try {
        // Récupérer toutes les salles du modèle
        const salles = await Salle.find();

        if (!salles || salles.length === 0) {
          // Si aucune salle n'existe, afficher un message
            return res.status(404).json({ message: 'Aucune salle trouvée.' });
        }
            // Envoyer la liste des salles
            res.status(200).json(salles);
        
    } catch (error) {
        // Gérer les erreurs
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la liste des salles.' });
    }
};

// Rendre la page de liste des salles
exports.allsallePage = async (req, res) => {
    try {
        // Récupérer toutes les salles
        const salles = await Salle.find();
        
        // Rendre la page sallelist.ejs en passant les données des salles
        res.render("sallelist.ejs", { salles: salles });
    } catch (err) {
        // Gérer les erreurs
        res.status(404).send("Page Not Found !");
    }
};