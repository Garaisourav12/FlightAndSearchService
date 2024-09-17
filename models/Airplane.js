"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db"); // Assuming you have a 'db.js' that sets up Sequelize

class Airplane extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
		this.hasMany(models.Flight, {
			foreignKey: "airplaneId",
			sourceKey: "id",
			onDelete: "CASCADE",
		});
	}
}
Airplane.init(
	{
		modelNumber: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlphanumeric: true,
			},
		},
		capacity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				max: 1000,
			},
		},
	},
	{
		sequelize,
		modelName: "Airplane",
		tableName: "airplanes",
		timestamps: true,
	}
);

module.exports = Airplane;
