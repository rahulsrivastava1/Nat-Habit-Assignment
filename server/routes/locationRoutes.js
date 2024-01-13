const express = require("express");

const locationController = require("../controllers/locationController");

const router = express.Router();

router.route("/add").post(locationController.addLocation);
router.route("/get").get(locationController.getLocations);
router.route("/getlocationdata").post(locationController.getLocationData);

module.exports = router;
