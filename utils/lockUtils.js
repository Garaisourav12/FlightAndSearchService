const addRowLockOnFlights = (flightId) => {
	retuen`SELECT * FROM flights WHERE id = ${flightId} FOR UPDATE`;
};

module.exports = { addRowLockOnFlights };
