const { BadRequestError } = require("../errors");
const { cityService } = require("../services");
const {
	errorResponse,
	successResponse,
	dataMissing,
	isEmptyObject,
} = require("../utils/commonUtils");

const getAllCities = async (req, res) => {
	try {
		const cities = await cityService.getAllCities();

		return successResponse(
			res,
			cities,
			"Retrieved all cities successfully!"
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const getCityById = async (req, res) => {
	const { id } = req.params;

	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide city id.");
		}

		const city = await cityService.getCityById(id);

		return successResponse(res, city, "Retrieved city successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

const createCity = async (req, res) => {
	const { name, country } = req.body;

	try {
		if (dataMissing(name, country)) {
			throw new BadRequestError("Please provide city name and country.");
		}

		const city = await cityService.createCity({ name, country });

		return successResponse(
			res,
			city,
			"New city created successfully!",
			201
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const updateCity = async (req, res) => {
	const { id } = req.params;

	try {
		if (isEmptyObject(req.body)) {
			throw new BadRequestError("Please provide city data to update.");
		}

		if (dataMissing(id)) {
			throw new BadRequestError("Please provide city id.");
		}

		if (dataMissing(...Object.values(req.body))) {
			throw new BadRequestError(
				"Please provide valid city data to update."
			);
		}

		const city = await cityService.updateCity(id, req.body);

		return successResponse(res, city, "City updated successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

const deleteCity = async (req, res) => {
	const { id } = req.params;

	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide city id.");
		}

		const city = await cityService.deleteCity(id);

		return successResponse(res, city, "City deleted successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

module.exports = {
	getAllCities,
	getCityById,
	createCity,
	updateCity,
	deleteCity,
};
