const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'JE_SUIS_UNE_CLEF_SECRETE');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Damned! L'userID n'est pas valable !  ";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Damned ! La requete n'est pas authentifiée!")
    });
  }
};