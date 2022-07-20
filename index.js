const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const router = require("./router/router.js");
var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/", cors(), router);

app.use(cors());

app.listen(3000, () => {
  console.log("Servidor rodando...");
});
