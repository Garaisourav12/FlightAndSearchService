const addRowLockOnFlights = (flightId) => {
	return `SELECT * FROM flights WHERE id = ${flightId} FOR UPDATE`;
};

const addRowLockOnAirplanes = (airplaneId) => {
	return `SELECT * FROM airplanes WHERE id = ${airplaneId} FOR UPDATE`;
};

module.exports = { addRowLockOnFlights, addRowLockOnAirplanes };
