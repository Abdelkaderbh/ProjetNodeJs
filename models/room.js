const mongoose = require('mongoose'); // Importation du module mongoose

const roomSchema = new mongoose.Schema({ 
    capacity: {
        type: Number, 
        required: true 
    },
    items: { 
        type: [String], 
        default: [] // Valeur par défaut: Tableau vide
    },
    availability: { 
        type: Boolean,
        default: true 
    }
});

const Room = mongoose.model('Room', roomSchema); // Création du modèle Room 

module.exports = Room; // Exportation Room
