const { BadRequestError, InternalServerError } = require("../errors");
const {
	airportRepository,
	airplaneRepository,
	flightRepository,
} = require("../repositories");

class FlightService {
	constructor() {
		this.airportRepository = airportRepository;
		this.airplaneRepository = airplaneRepository;
		this.flightRepository = flightRepository;
	}

	async getAllFlights() {
		try {
			return await this.flightRepository.getAll();
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async searchFlights(query) {
		let customFilter = {};
		let sortFilter = [];
		const endingTripTime = " 23:59:00";

		// Input: trips=MUM-BOM
		if (query.trips) {
			[departureAirportId, arrivalAirportId] = query.trips.split("-");
			customFilter.departureAirportId = departureAirportId;
			customFilter.arrivalAirportId = arrivalAirportId;

			// add a check that departureAirportId & arrivalAirportId are not same
			if (departureAirportId === arrivalAirportId) {
				throw new BadRequestError(
					"Departure and Arrival Airport can't be same."
				);
			}
		}

		// Input: price=1000-2000 or price=1000
		if (query.price) {
			[minPrice, maxPrice] = query.price.split("-");
			customFilter.price = {
				[Op.between]: [
					minPrice,
					maxPrice == undefined ? 20000 : maxPrice,
				],
			};
		}

		// Input: travellers=5
		if (query.travellers) {
			customFilter.totalSeats = {
				[Op.gte]: query.travellers,
			};
		}

		// Input: tripDate=2022-01-01
		if (query.tripDate) {
			customFilter.departureTime = {
				[Op.between]: [query.tripDate, query.tripDate + endingTripTime],
			};
		}

		// Inputs: sort=departureTime_desc,price_asc or sort=departureTime,price
		if (query.sort) {
			const params = query.sort.split(",");
			const sortFilters = params.map((params) => params.split("_"));
			sortFilter = sortFilters;
		}

		try {
			return await this.flightRepository.getAllFlights(
				customFilter,
				sortFilter
			);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async getFlightById(id) {
		try {
			return await this.flightRepository.get(id);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async createFlight(data) {
		const { airplaneId, departureAirportId, arrivalAirportId } = data;

		try {
			const airplane = this.airplaneRepository.get(airplaneId);
			if (!airplane) {
				throw new NotFoundError("Airplane not found!");
			}

			const departureAirport =
				this.airportRepository.get(departureAirportId);
			if (!departureAirport) {
				throw new NotFoundError("Departure airport not found!");
			}

			const arrivalAirport = this.airportRepository.get(arrivalAirportId);
			if (!arrivalAirport) {
				throw new NotFoundError("Arrival airport not found!");
			}

			return await this.flightRepository.create(data);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async updateFlight(id, data) {
		const { airplaneId, departureAirportId, arrivalAirportId } = data;

		try {
			if (airplaneId) {
				const airplane = this.airplaneRepository.get(airplaneId);
				if (!airplane) {
					throw new NotFoundError("Airplane not found!");
				}
			}

			if (departureAirportId) {
				const departureAirport =
					this.airportRepository.get(departureAirportId);
				if (!departureAirport) {
					throw new NotFoundError("Departure airport not found!");
				}
			}

			if (arrivalAirportId) {
				const arrivalAirport =
					this.airportRepository.get(arrivalAirportId);
				if (!arrivalAirport) {
					throw new NotFoundError("Arrival airport not found!");
				}
			}

			return await this.flightRepository.update(id, data);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async updateFlightStatus(id, data) {
		try {
			return await this.flightRepository.updateFlightStatus(
				id,
				data.seats,
				data.transactionType
			);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async deleteFlight(id) {
		try {
			return await this.flightRepository.delete(id);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}
}

module.exports = new FlightService();
