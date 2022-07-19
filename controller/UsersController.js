var Users = require("../models/Users.js");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var secret = "73aq+*c*vtzr)shx-s-ykb=%@p!&=57qs9-amuk0pivnito-8$";

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
    var { name, email, password, role } = req.body;

    var emailExists = await Users.findByEmail(email);

    if (emailExists == undefined) {
      res.status(406);
      res.json({ err: "Este nome ja está cadastrado!" });
    } else {
      var result = await Users.create(name, email, password, { role: 0 });
      if (result) {
        res.json(result.msg);
      } else {
        res.status(406);
        res.json(result.msg);
      }
    }
  }

  async remove(req, res) {
    var id = req.params.id;

    var userExists = await Users.findById(id);

    if (userExists != undefined) {
      await Users.delete(id);
      res.json("Usuario deletado!");
    } else {
      res.status(404);
      res.json({ err: "Usuario nao encontrado!" });
    }
  }

  async login(req, res) {
    var { email, password } = req.body;

    var user = await Users.findByEmail(email);
    if (user != undefined) {
      var result = await bcrypt.compare(password, user.password);

      if (result) {
        var token = jwt.sign({ email: user.email, role: user.role }, secret);
        res.json({ token: token });
      } else {
        res.status(404);
        res.json({ err: "Usuario ou senha invalida!" });
      }
    } else {
      res.json("Usuario não encontrado!");
    }
  }
}

module.exports = new UsersController();
