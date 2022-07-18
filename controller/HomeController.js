

class HomeController {
  async index(req, res) {
    res.send("Bem vindo!");
  }


}

module.exports = new HomeController();
