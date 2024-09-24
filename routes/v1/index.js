const express = require("express");
const v1ApiRouter = express.Router();

// Import Routes
const cityRoutes = require("./city.routes");
const airportRoutes = require("./airport.routes");
const airplaneRoutes = require("./airplane.routes");
const flightRoutes = require("./flight.routes");

// Use Routes
v1ApiRouter.use("/flights", flightRoutes);
v1ApiRouter.use("/cities", cityRoutes);
v1ApiRouter.use("/airports", airportRoutes);
v1ApiRouter.use("/airplanes", airplaneRoutes);

module.exports = v1ApiRouter;
