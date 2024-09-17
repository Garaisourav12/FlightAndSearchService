const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	PORT: process.env.PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	SALT: Number(process.env.SALT),
	DB_HOST: process.env.DB_HOST,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_NAME: process.env.DB_NAME,
	DB_PORT: Number(process.env.DB_PORT),
	DB_LOGGING: process.env.DB_LOGGING === "true",
	DIALECT: process.env.DIALECT,
	DB_SYNC: process.env.DB_SYNC === "true",
};
