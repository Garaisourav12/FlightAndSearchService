"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db"); // Assuming you have a 'db.js' that sets up Sequelize

class Flight extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// Define association with Airport
		this.belongsTo(models.Airport, {
			foreignKey: "departureAirportId",
			targetKey: "id",
			as: "departureAirport",
			onDelete: "CASCADE",
		});
		this.belongsTo(models.Airport, {
			foreignKey: "arrivalAirportId",
			targetKey: "id",
			as: "arrivalAirport",
			onDelete: "CASCADE",
		});

		// Define association with Airplane
		this.belongsTo(models.Airplane, {
			foreignKey: "airplaneId",
			targetKey: "id",
			as: "airplaneDetails",
			onDelete: "CASCADE",
		});

		// Define association with Passenger (if any)
	}
}

Flight.init(
	{
		flightNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		airplaneId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "airplanes",
				key: "id",
			},
		},
		departureTime: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		arrivalTime: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		departureAirportId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "airports",
				key: "id",
			},
		},
		arrivalAirportId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "airports",
				key: "id",
			},
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		boardingGate: {
			type: DataTypes.STRING,
		},
		totalSeats: {
			//total remaining seats
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Flight",
		tableName: "flights",
		timestamps: true,
	}
);

module.exports = Flight;
