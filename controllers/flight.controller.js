const { BadRequestError } = require("../errors");
const { flightService } = require("../services");
const {
	successResponse,
	errorResponse,
	dataMissing,
} = require("../utils/commonUtils");

const getAllFlights = async (req, res) => {
	try {
		const flights = await flightService.getAllFlights();
		return successResponse(
			res,
			flights,
			"Retrieved all flights successfully!"
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const searchFlights = async (req, res) => {
	try {
		const flights = await flightService.searchFlights(req.query);
		return successResponse(res, flights, "Retrieved flights successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

const getFlightById = async (req, res) => {
	const { id } = req.params;
	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide flight id.");
		}
		const flight = await flightService.getFlightById(id);
		return successResponse(res, flight, "Retrieved flight successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

const createFlight = async (req, res) => {
	const {
		departureAirportId,
		arrivalAirportId,
		departureTime,
		arrivalTime,
		price,
		totalSeats,
	} = req.body;

	try {
		if (
			dataMissing(
				departureAirportId,
				arrivalAirportId,
				departureTime,
				arrivalTime,
				price,
				totalSeats
			)
		) {
			throw new BadRequestError(
				"Please provide departureAirportId, arrivalAirportId, departureTime, arrivalTime, price and totalSeats."
			);
		}

		const flight = await flightService.createFlight(req.body);

		return successResponse(
			res,
			flight,
			"New flight created successfully!",
			201
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const updateFlight = async (req, res) => {
	const { id } = req.params;

	try {
		if (isEmptyObject(req.body)) {
			throw new BadRequestError("Please provide flight data to update.");
		}

		if (dataMissing(id)) {
			throw new BadRequestError("Please provide flight id.");
		}

		if (dataMissing(...Object.values(req.body))) {
			throw new BadRequestError(
				"Please provide departureAirportId, arrivalAirportId, departureTime, arrivalTime, price and totalSeats."
			);
		}

		const flight = await flightService.updateFlight(id, req.body);
		return successResponse(res, flight, "Flight updated successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

const updateFlightSeats = async (req, res) => {
	const { id } = req.params;
	const { seats, transactionType } = req.body;

	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide flight id.");
		}

		if (dataMissing(seats, transactionType)) {
			throw new BadRequestError(
				"Please provide seats and transactionType."
			);
		}

		const flight = await flightService.updateFlightSeats(
			id,
			seats,
			transactionType
		);
		return successResponse(
			res,
			flight,
			"Flight seat updated successfully!"
		);
	} catch (error) {
		return errorResponse(res, error);
	}
};

const deleteFlight = async (req, res) => {
	const { id } = req.params;

	try {
		if (dataMissing(id)) {
			throw new BadRequestError("Please provide flight id.");
		}

		const flight = await flightService.deleteFlight(id);
		return successResponse(res, flight, "Flight deleted successfully!");
	} catch (error) {
		return errorResponse(res, error);
	}
};

module.exports = {
	getAllFlights,
	searchFlights,
	getFlightById,
	createFlight,
	updateFlight,
	updateFlightSeats,
	deleteFlight,
};
