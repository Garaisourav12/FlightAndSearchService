const { InternalServerError } = require("../errors");
const { cityRepository } = require("../repositories");

class CityService {
	constructor() {
		this.cityRepository = cityRepository;
	}

	async getAllCities() {
		try {
			return await this.cityRepository.getAll();
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}

	async getCityById(id) {
		try {
			return await this.cityRepository.get(id);
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}

	async createCity(data) {
		try {
			return await this.cityRepository.create(data);
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}

	async updateCity(id, data) {
		try {
			return await this.cityRepository.update(id, data);
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}

	async deleteCity(id) {
		try {
			return await this.cityRepository.delete(id);
		} catch (error) {
			throw new InternalServerError("Internal Server Error!");
		}
	}
}

module.exports = new CityService();
