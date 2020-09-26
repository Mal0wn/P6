const express = require('express'); // on importe l'application express
const bodyParser = require('body-parser'); //on importe body-parser
const mongoose = require('mongoose'); // on importe mongoose pour se connecter au cluster MongoDB
const path = require('path');
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://mal0wn:Arkey0406^^@piqp6.xwpjl.gcp.mongodb.net/PiqP6?retryWrites=true&w=majority',   // connexion au cluster 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express(); // Création de  l'application express

// Ajout de headers, * user peut accéder à l'API, autorisation d'utiliser des en-tête sur l'objet requête et certaines méthodes (get, post etc)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());// Va transformer le corps de la requête en objet JS utilisable
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes); // Importation des routes depuis le fichier sauce.js du dossier routes
app.use('/api/auth', userRoutes); // Importation de la route depuis le fichier user.js du dossier routes




module.exports = app; // Exportation de la const app pour y accèder depuis les autres fichiers.