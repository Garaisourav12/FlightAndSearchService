const { v4: uuidv4 } = require("uuid");

const generateFlightNumber = () => {
	// Generate a UUID and use the first 8 characters for uniqueness
	const uniqueId = uuidv4().split("-")[0].toUpperCase();

	return uniqueId;
};

module.exports = { generateFlightNumber };
