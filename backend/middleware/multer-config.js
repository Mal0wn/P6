const multer = require('multer'); // Outil pour enregistrer les images

const MIME_TYPES = {     // prendre tout type de terminaison 
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
};

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, 'images');
    },
    filename: (req,file,callback) => {
    const name = file.originalname.split(' ').join('_'); // je delete les espace dans le titre pour coller les caractères
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now()+ '.' + extension);   // renomme l'image en lui donnant son name+timestamp.jpeg
    }
});

module.exports = multer({storage}).single('image');