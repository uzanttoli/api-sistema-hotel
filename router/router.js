const express = require("express");
const router = express.Router();
var HomeController = require("../controller/HomeController.js");
var HotelsController = require("../controller/HotelsController.js");
var UsersController = require("../controller/UsersController.js");
var MarkingController = require("../controller/MarkingController.js");

var Authenticator = require("../middleware/Authenticator.js");
var VerifyToken = require("../middleware/VerifyToken.js");

router.get("/", HomeController.index);
// router.post("/validate", Authenticator, HomeController.validate);
//Hotels
router.get("/hotels", VerifyToken, HotelsController.index);
router.get("/hotels/:id", VerifyToken, HotelsController.hotelById);
router.post("/hotels", VerifyToken, HotelsController.new);
router.delete("/hotels", VerifyToken, HotelsController.remove);

router.get("/users", VerifyToken, UsersController.index);
router.post("/users", UsersController.new);
router.get("/user/:id", VerifyToken, UsersController.userId);
router.delete("/user/:id", VerifyToken, UsersController.remove);
router.post("/login", UsersController.login);
router.post("/validate", UsersController.validateToken);
router.post("/recoverypassword", UsersController.recoveryPassword);
router.post("/changepassword", UsersController.changepassword);

router.post("/register", VerifyToken, MarkingController.register);
router.get("/records", VerifyToken, MarkingController.records);
module.exports = router;
