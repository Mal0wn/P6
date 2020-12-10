const multer = require('multer'); // Outil pour enregistrer les images

const MIME_TYPES = {     // prendre tout type de terminaison 
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
};

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, 'images');                       //on donne une destination a multer pour qu'il enregistre dans le dossier 'images'
    },
    filename: (req,file,callback) => {                     //la fonctione filename indique a multer d'utiliser le nom d'origine
    const name = file.originalname.split(' ').join('_'); // il delete les espace dans le titre pour y mettre des underscores
    const extension = MIME_TYPES[file.mimetype];         // declaration de la constante extension pour résoudre l'extension de fichier appropriée
    callback(null, name + Date.now()+ '.' + extension);   // renomme l'image en lui donnant son name+timestamp+.jpeg
    }
});

module.exports = multer({storage}).single('image');