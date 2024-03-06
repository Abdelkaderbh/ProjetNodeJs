const mongoose = require('mongoose'); // Importation du module mongoose

const salleSchema = new mongoose.Schema({ 
    name: {
        type: String, 
        required: true 
    },
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

const Salle = mongoose.model('Salle', salleSchema); // Création du modèle Salle 

module.exports = Salle; // Exportation Salle
