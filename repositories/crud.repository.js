const { NotFoundError } = require("../errors");

class CrudRepository {
	constructor(model) {
		this.model = model;
	}

	async create(data) {
		const result = await this.model.create(data);
		if (!result) {
			throw new NotFoundError("Resource not found!");
		}
		return result;
	}

	async get(id) {
		const result = await this.model.findByPk(id);
		return result;
	}

	async getAll() {
		const results = await this.model.findAll();
		return results;
	}

	async getByFieldObj(fieldObj) {
		const result = await this.model.findOne({
			where: fieldObj,
		});
		return result;
	}

	async update(id, data) {
		// I need updated resource as return value
		const [result] = await this.model.update(data, {
			where: {
				id,
			},
		});

		if (result === 0) {
			throw new NotFoundError("Resource not found!");
		}
		return await this.get(id);
	}

	async delete(id) {
		// I need deleted resource as return value
		const toBeDeleted = await this.get(id);
		const result = await this.model.destroy({
			where: {
				id,
			},
		});
		if (result === 0) {
			throw new NotFoundError("Resource not found!");
		}
		return toBeDeleted;
	}
}

module.exports = CrudRepository;
