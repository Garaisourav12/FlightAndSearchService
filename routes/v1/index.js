const express = require("express");
const v1ApiRouter = express.Router();

// Import Routes
const flightRoutes = require("./flight.routes");

// Use Routes
v1ApiRouter.use("/flight", flightRoutes);

module.exports = v1ApiRouter;
