var Hotels = require("../models/Hotels.js");

class HotelsController {
  async index(req, res) {
    var hotels = await Hotels.findAll();
    res.json(hotels);
  }

  async hotelById(req, res) {
    var id = req.params.id;
    var result = await Hotels.findById(id);
    if (result != undefined) {
      res.json(result);
    } else {
      res.status(404);
      res.json({ err: "Não encontrado!" });
    }
  }

  async new(req, res) {
    var name = req.body.name;

    var hotelsExists = await Hotels.findByName(name);

    if (hotelsExists) {
      res.status(406);
      res.json({ err: "Este nome ja está cadastrado!" });
    } else {
      if (name == undefined || name == "" || name == " ") {
        res.json({ err: "O nome é invalido!" });
        res.status(400);
      } else {
        await Hotels.create(name);
        res.send("Criado com sucesso!");
      }
    }
  }

  async remove(req, res) {
    var id = req.body.id;

    var result = await Hotels.delete(id);

    if (result.status) {
      res.json({ msg: "Deletado com sucesso!" });
    } else {
      res.status(400);
      res.json(result.err);
    }
  }
}

module.exports = new HotelsController();
