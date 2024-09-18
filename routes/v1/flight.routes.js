const express = require("express");
const { flightController } = require("../../controllers");

const flightRoutes = express.Router();

// Flight routes
flightRoutes.get("/", flightController.getAllFlights);
flightRoutes.get("/available", flightController.searchFlights);
flightRoutes.get("/:id", flightController.getFlightById);
flightRoutes.post("/", flightController.createFlight);
flightRoutes.put("/:id", flightController.updateFlight);
flightRoutes.put("/:id/seats", flightController.updateFlightSeats);
flightRoutes.delete("/:id", flightController.deleteFlight);

module.exports = flightRoutes;
