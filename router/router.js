const express = require("express");
const router = express.Router();
var HomeController = require("../controller/HomeController.js");
var HotelsController = require("../controller/HotelsController.js");

router.get('/', HomeController.index);

//Hotels
router.get('/hotels', HotelsController.index);
router.get('/hotels/:id', HotelsController.hotelById);
router.post('/hotels', HotelsController.new);
router.delete("/hotels", HotelsController.remove);

module.exports = router;