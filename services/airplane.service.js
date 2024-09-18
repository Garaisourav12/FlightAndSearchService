const { InternalServerError } = require("../errors");
const { airportRepository } = require("../repositories");

class AirplaneService {
	constructor() {
		this.airportRepository = airportRepository;
	}

	async getAllAirplanes() {
		try {
			return await this.airportRepository.getAll();
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async getAirplaneById(id) {
		try {
			return await this.airportRepository.get(id);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async createAirplane(data) {
		try {
			return await this.airportRepository.create(data);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async updateAirplane(id, data) {
		try {
			return await this.airportRepository.update(id, data);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async deleteAirplane(id) {
		try {
			return await this.airportRepository.delete(id);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}
}

module.exports = new AirplaneService();
