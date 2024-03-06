const Room = require('../models/room');
exports.afficherListeRooms = async (req, res) => {
    try {
        // Récupérer toutes les rooms du modèle
        const rooms = await Room.find();

        if (!rooms || rooms.length === 0) {
          // Si aucune room n'existe, afficher un message
            return res.status(404).json({ message: 'Aucune room trouvée.' });
        }
            // Envoyer la liste des rooms
            res.status(200).json(rooms);
        
    } catch (error) {
        // Gérer les erreurs
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la liste des rooms.' });
    }
};
