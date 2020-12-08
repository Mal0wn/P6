const bcrypt = require('bcrypt');     //Plugin pour crypter les mots de passe
const jwt = require('jsonwebtoken');    // Plugin Token utilisateurs

const User = require('../models/user');

// fonction créer un user
exports.signup = (req, res) => {
  User.findOne({
          email: req.body.email
      })
      .then((user) => {
          if (user) {
              return res.status(401).send({
                  error: 'Try an other email !',})
          }
          bcrypt
              .hash(req.body.password, 10)
              .then((hash) => {
                  const user = new User({
                      email: req.body.email,
                      password: hash,})
                  user
                      .save()
                      .then(() =>
                          res.status(201).json({
                              message: 'user created!',
                              userId: user._id,
                          }))
                      .catch((error) =>
                          res.status(400).json({
                              error,
                          }))
              })
      })
      .catch((error) =>
          res.status(500).json({
              error,
          }))}


//function connect a user
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)               //comparaison des mdp
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'JE_SUIS_UNE_CLEF_SECRETE',
                {expiresIn:"24h"}
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };