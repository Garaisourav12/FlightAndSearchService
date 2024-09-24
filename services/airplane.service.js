const { InternalServerError } = require("../errors");
const { airplaneRepository } = require("../repositories");

class AirplaneService {
	constructor() {
		this.airplaneRepository = airplaneRepository;
	}

	async getAllAirplanes() {
		try {
			return await this.airplaneRepository.getAll();
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async getAvailableAirplanes(departureAirportId, departureTime) {
		try {
			return await this.airplaneRepository.getAvailableAirplanes(
				departureAirportId,
				departureTime
			);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async getAirplaneById(id) {
		try {
			return await this.airplaneRepository.get(id);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async createAirplane(data) {
		try {
			return await this.airplaneRepository.create(data);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async updateAirplane(id, data) {
		try {
			return await this.airplaneRepository.update(id, data);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}

	async deleteAirplane(id) {
		try {
			return await this.airplaneRepository.delete(id);
		} catch (error) {
			throw new InternalServerError("Internal server error!");
		}
	}
}

module.exports = new AirplaneService();
