const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db"); // Assuming you have a 'db.js' that sets up Sequelize

class City extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association with Airport
		this.hasMany(models.Airport, {
			foreignKey: "cityId",
			sourceKey: "id",
		});
	}
}

// Define the model
City.init(
	{
		// Define attributes
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Sequelize connection instance
		sequelize,
		modelName: "City", // Name of the model
		tableName: "cities", // Name of the table in the database
		timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
	}
);

module.exports = City;
