const CrudRepository = require("./crud.repository");
const { Flight, Airplane, Airport } = require("../models");
const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");
const { addRowLockOnFlights } = require("../utils/lockUtils");

class FlightRepository extends CrudRepository {
	constructor() {
		super(Flight);
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
		try {
			const transaction = await sequelize.transaction();
			await sequelize.query(addRowLockOnFlights(flightId));
			const flight = await this.get(flightId);

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
