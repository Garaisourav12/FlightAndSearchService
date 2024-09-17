const { Sequelize } = require("sequelize");
const {
	DB_NAME,
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DIALECT,
	DB_PORT,
	DB_LOGGING,
	DB_SYNC,
} = require("./envConfig");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: DIALECT,
	logging: DB_LOGGING,
});

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		if (DB_SYNC) {
			await sequelize.sync({ force: true });
			console.log("Database has been synchronized successfully.");
		}
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error.message);
	}
};

connectDB();

module.exports = { sequelize };
