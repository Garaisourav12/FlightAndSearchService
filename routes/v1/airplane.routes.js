const express = require("express");
const { airplaneController } = require("../../controllers");

const airplaneRoutes = express.Router();

// Airplane Routes
airplaneRoutes.get("/", airplaneController.getAllAirplanes);
airplaneRoutes.get(
	"/:departureAirportId/:departureTime",
	airplaneController.getAvailableAirplanes
);
airplaneRoutes.get("/:id", airplaneController.getAirplaneById);
airplaneRoutes.post("/", airplaneController.createAirplane);
airplaneRoutes.put("/:id", airplaneController.updateAirplane);
airplaneRoutes.delete("/:id", airplaneController.deleteAirplane);

module.exports = airplaneRoutes;
