var jwt = require("jsonwebtoken");

var secret = "73aq+*c*vtzr)shx-s-ykb=%@p!&=57qs9-amuk0pivnito-8$";

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided." });
  }

  const bearer = token.split(" ");
  var tokenDecoded = bearer[1];

  jwt.verify(tokenDecoded, secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
};
