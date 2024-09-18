const { NotFoundError, InternalServerError } = require("../errors");
const { cityRepository, airportRepository } = require("../repositories");

class AirportService {
	constructor() {
		this.airportRepository = airportRepository;
		this.cityRepository = cityRepository;
	}

	async getAllAirports() {
		try {
			return await this.airportRepository.getAll();
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}

	async getAirportById(id) {
		try {
			return await this.airportRepository.get(id);
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}

	async createAirport(data) {
		const { cityId } = data;

		try {
			const city = await this.cityRepository.get(cityId);
			if (!city) {
				throw new NotFoundError("City not found!");
			}

			return await this.airportRepository.create(data);
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}

	async updateAirport(id, data) {
		const { cityId } = data;

		try {
			if (cityId) {
				const city = await this.cityRepository.get(cityId);
				if (!city) {
					throw new NotFoundError("City not found!");
				}
			}

			return await this.airportRepository.update(id, data);
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}

	async deleteAirport(id) {
		try {
			return await this.airportRepository.delete(id);
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}
}

module.exports = new AirportService();
