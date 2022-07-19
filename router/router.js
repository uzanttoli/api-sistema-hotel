const express = require("express");
const router = express.Router();
var HomeController = require("../controller/HomeController.js");
var HotelsController = require("../controller/HotelsController.js");
var UsersController = require("../controller/UsersController.js");

router.get("/", HomeController.index);

//Hotels
router.get("/hotels", HotelsController.index);
router.get("/hotels/:id", HotelsController.hotelById);
router.post("/hotels", HotelsController.new);
router.delete("/hotels", HotelsController.remove);

router.get("/users", UsersController.index);
router.post("/users", UsersController.new);
router.get("/user/:id", UsersController.userId);
router.delete("/user/:id", UsersController.remove);
router.post("/login", UsersController.login);
module.exports = router;
