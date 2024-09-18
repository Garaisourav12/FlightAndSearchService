const { airportService } = require("../services");
const {
	successResponse,
	dataMissing,
	errorResponse,
	isEmptyObject,
} = require("../utils/commonUtils");

const getAllAirports = async (req, res) => {
	try {
		const airports = await airportService.getAllAirports();

		return successResponse(
			res,
			airports,
			"Retrieved all airports successfully!"
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const getAirportById = async (req, res) => {
	const { id } = req.params;

	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide airport id.");
		}

		const airport = await airportService.getAirportById(id);

		return successResponse(res, airport, "Retrieved airport successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

const createAirport = async (req, res) => {
	const { name, code, address, cityId } = req.body;
	try {
		if (dataMissing(name, code, address, cityId)) {
			throw new BadRequestError(
				"Please provide airport name, code, address and cityId."
			);
		}

		const airport = await airportService.createAirport(req.body);
		return successResponse(
			res,
			airport,
			"New airport created successfully!",
			201
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const updateAirport = async (req, res) => {
	const { id } = req.params;

	try {
		if (isEmptyObject(req.body)) {
			throw new BadRequestError("Please provide airport data to update.");
		}

		if (dataMissing(id)) {
			throw new BadRequestError("Please provide airport id.");
		}

		if (dataMissing(...Object.values(req.body))) {
			throw new BadRequestError(
				"Please provide airport name, code, address and cityId."
			);
		}

		const airport = await airportService.updateAirport(id, req.body);
		return successResponse(res, airport, "Airport updated successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

const deleteAirport = async (req, res) => {
	const { id } = req.params;

	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide airport id.");
		}

		const airport = await airportService.deleteAirport(id);

		return successResponse(res, airport, "Airport deleted successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

module.exports = {
	getAllAirports,
	getAirportById,
	createAirport,
	updateAirport,
	deleteAirport,
};
