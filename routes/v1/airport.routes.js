const express = require("express");
const { airportController } = require("../../controllers");

const airportRoutes = express.Router();

// Airport Routes
airportRoutes.get("/", airportController.getAllAirports);
airportRoutes.get("/:id", airportController.getAirportById);
airportRoutes.post("/", airportController.createAirport);
airportRoutes.put("/:id", airportController.updateAirport);
airportRoutes.delete("/:id", airportController.deleteAirport);

module.exports = airportRoutes;
