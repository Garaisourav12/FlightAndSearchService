const CrudRepository = require("./crud.repository");
const airplaneRepository = require("./airplane.repository");
const { Flight, Airplane, Airport } = require("../models");
const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");
const { BadRequestError } = require("../errors");

class FlightRepository extends CrudRepository {
	constructor() {
		super(Flight);
	}

	async addRowLock(id, transaction) {
		const flight = await this.model.findByPk(id, {
			lock: transaction.LOCK.UPDATE,
			transaction,
		});

		return flight;
	}

	async create(data, airplane) {
		const transaction = await sequelize.transaction();

		try {
			// Add row lock on the airplane
			await airplaneRepository.addRowLock(data.airplaneId, transaction);

			// Check airplane availability
			const isAirplaneAvailable =
				await airplaneRepository.isAirplaneAvailable(
					data.airplaneId,
					data.departureAirportId,
					data.departureTime,
					transaction
				); // Returning array of available flights

			if (!isAirplaneAvailable) {
				throw new BadRequestError(
					`Airplane ${airplane.modelNumber} is not available for the flight!`
				);
			}

			// Create flight
			const flight = await this.model.create(data, { transaction });
			await transaction.commit();

			return flight;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async findAllFlights(fliter, sort) {
		const flights = await this.model.findAll({
			where: fliter,
			order: sort,
			includes: [
				{
					model: Airplane,
					required: true,
					as: "airplaneDetails",
				},
				{
					model: Airport,
					required: true,
					as: "departureAirport",
					on: {
						col1: Sequelize.where(
							Sequelize.col("Flight.departureAirportId"),
							"=",
							Sequelize.col("departureAirport.id")
						),
					},
					include: {
						model: City,
						required: true,
					},
				},
				{
					model: Airport,
					required: true,
					as: "arrivalAirport",
					on: {
						col1: Sequelize.where(
							Sequelize.col("Flight.arrivalAirportId"),
							"=",
							Sequelize.col("arrivalAirport.id")
						),
					},
					include: {
						model: City,
						required: true,
					},
				},
			],
		});

		return flights;
	}

	async updateRemainingSeats(flightId, seats, transactionType) {
		const transaction = await sequelize.transaction();

		try {
			// Get flight and set lock
			const flight = await this.addRowLock(flightId, transaction);

			if (transactionType === "book") {
				await flight.decrement(
					"totalSeats",
					{ by: seats },
					{ transaction: transaction }
				);
			} else {
				await flight.increment(
					"totalSeats",
					{ by: seats },
					{ transaction: transaction }
				);
			}
			await transaction.commit();
			return flight;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
}

module.exports = new FlightRepository();
