const { BadRequestError } = require("../errors");
const { airplaneService } = require("../services");
const {
	errorResponse,
	dataMissing,
	isEmptyObject,
	successResponse,
} = require("../utils/commonUtils");

const getAllAirplanes = async (req, res) => {
	try {
		const airplanes = await airplaneService.getAllAirplanes();

		return successResponse(
			res,
			airplanes,
			"Retrieved all airplanes successfully!"
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const getAvailableAirplanes = async (req, res) => {
	const { departureAirportId, departureTime } = req.params;

	try {
		if (dataMissing(departureAirportId, departureTime)) {
			throw new BadRequestError();
		}

		const airplanes = await airplaneService.getAvailableAirplanes(
			departureAirportId,
			departureTime
		);

		return successResponse(
			res,
			airplanes,
			"Retrieved available airplanes successfully!"
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const getAirplaneById = async (req, res) => {
	const { id } = req.params;

	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide airplane id.");
		}

		const airplane = await airplaneService.getAirplaneById(id);
		return successResponse(
			res,
			airplane,
			"Retrieved airplane successfully!"
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const createAirplane = async (req, res) => {
	const { modelNumber, capacity } = req.body;

	try {
		if (dataMissing(modelNumber, capacity)) {
			throw new BadRequestError();
		}

		const airplane = await airplaneService.createAirplane(req.body);
		return successResponse(
			res,
			airplane,
			"New airplane created successfully!",
			201
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const updateAirplane = async (req, res) => {
	const { id } = req.params;

	try {
		if (isEmptyObject(req.body)) {
			throw new BadRequestError(
				"Please provide airplane data to update."
			);
		}

		if (dataMissing(id)) {
			throw new BadRequestError("Please provide airplane id.");
		}

		if (dataMissing(...Object.values(req.body))) {
			throw new BadRequestError(
				"Please provide valid airplane data to update."
			);
		}

		const airplane = await airplaneService.updateAirplane(id, req.body);
		return successResponse(res, airplane, "Airplane updated successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

const deleteAirplane = async (req, res) => {
	const { id } = req.params;

	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide airplane id.");
		}

		const airplane = await airplaneService.deleteAirplane(id);
		return successResponse(res, airplane, "Airplane deleted successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

module.exports = {
	getAllAirplanes,
	getAvailableAirplanes,
	getAirplaneById,
	createAirplane,
	updateAirplane,
	deleteAirplane,
};
