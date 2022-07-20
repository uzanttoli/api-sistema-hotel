var Marking = require("../models/Marking.js");
var UsersController = require("../models/Users.js");
var HotelsController = require("../models/Hotels.js");

class MarkingController {
  async register(req, res) {
    var { user_id, hotel_id, description, date, started, finished, daily } =
      req.body;

    var userIdExists = await UsersController.findById(user_id);
    var hotelIdExists = await HotelsController.findById(hotel_id);

    if (userIdExists != undefined && hotelIdExists != undefined) {
      var result = await Marking.create(
        user_id,
        hotel_id,
        description,
        date,
        started,
        finished,
        daily
      );
      if (result.status) {
        res.json("Registro inserido com sucesso!");
      } else {
        res.status(406);
        res.json(result.err);
      }
    } else {
      res.status(406);
      res.json("Usuario ou hotel não castrados!");
    }
  }

  async records(req, res) {
    var records = await Marking.findAll();
    res.json(records);
  }
}

module.exports = new MarkingController();
