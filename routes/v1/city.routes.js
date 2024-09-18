const express = require("express");
const { cityController } = require("../../controllers");

const cityRoutes = express.Router();

// City Routes
cityRoutes.get("/", cityController.getAllCities);
cityRoutes.get("/:id", cityController.getCityById);
cityRoutes.post("/", cityController.createCity);
cityRoutes.put("/:id", cityController.updateCity);
cityRoutes.delete("/:id", cityController.deleteCity);

module.exports = cityRoutes;
