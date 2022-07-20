class HomeController {
  async index(req, res) {
    res.send("Bem vindo!");
  }
  async validate(req, res) {
    res.send("Bem vindo!");
  }
}

module.exports = new HomeController();
