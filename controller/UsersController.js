var Users = require("../models/Users.js");

class UsersController {
  async index(req, res) {
    var users = await Users.findAll();
    res.json(users);
  }

  async userId(req, res) {
    var id = req.params.id;

    var result = await Users.findById(id);

    if (result) {
      res.json(result);
    } else {
      res.status(404);
      res.json({ err: "Usuario nao encontrado!" });
    }
  }

  async new(req, res) {
    var { name, email, password } = req.body;

    var emailExists = await Users.findByEmail(email);

    if (emailExists) {
      res.status(406);
      res.json({ err: "Este nome ja está cadastrado!" });
    } else {
      var result = await Users.create(name, email, password);
      if (result) {
        res.json(result.msg);
      } else {
        res.status(406);
        res.json(result.msg);
      }
    }
  }
}

module.exports = new UsersController();
