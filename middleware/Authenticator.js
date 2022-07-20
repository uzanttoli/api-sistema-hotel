const jwt = require("jsonwebtoken");

var secret = "73aq+*c*vtzr)shx-s-ykb=%@p!&=57qs9-amuk0pivnito-8$";

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];

    try {
      var decoded = jwt.verify(token, secret);
      console.log(decoded);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.json({ err: "Vocè não tem permissão para executar está ação!" });
        return;
      }
    } catch (error) {
      res.status(403);
      res.json({ err: "Vocè não tem permissão para executar está ação!" });
      return;
    }
  } else {
    res.status(403);
    res.json({ err: "Você não está autenticado!" });
    return;
  }
};
