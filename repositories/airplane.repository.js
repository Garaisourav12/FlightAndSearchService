const CrudRepository = require("./crud.repository");
const { Airplane } = require("../models");
const { sequelize } = require("../db");

class AirplaneRepository extends CrudRepository {
	constructor() {
		super(Airplane);
	}

	async addRowLock(id, transaction) {
		const airplane = await this.model.findByPk(id, {
			lock: transaction.LOCK.UPDATE,
			transaction,
		});

		return airplane;
	}

	// Available Airplanes
	async getAvailableAirplanes(
		departureAirportId,
		departureTime,
		transaction
	) {
		// SQL query to find available airplanes based on the last flight
		const airplanes = await sequelize.query(
			`
        SELECT a.* 
        FROM airplanes a 
        LEFT JOIN (
            -- Subquery to get the last flight for each airplane
            SELECT f.airplaneId, f.arrivalAirportId, f.arrivalTime
            FROM flights f
            WHERE f.arrivalTime = (
                SELECT MAX(f2.arrivalTime)
                FROM flights f2
                WHERE f2.airplaneId = f.airplaneId
            )
        ) lf ON lf.airplaneId = a.id
        
        -- Check for airplanes that either:
        -- 1. Have never been used in a flight before (lf.airplaneId IS NULL)
        -- 2. Their last flight arrived at the desired departure airport
        -- 3. Their last flight arrived at least 2 hours before the desired departure time
        WHERE 
            (lf.airplaneId IS NULL) -- Airplane has no flight history
            OR (lf.arrivalAirportId = :departureAirportId AND lf.arrivalTime < DATE_SUB(:departureTime, INTERVAL 2 HOUR)) -- Last flight landed at the departure airport and at least 2 hours before the departure time
        `,
			{
				// Safely passing variables to avoid SQL injection
				replacements: {
					departureAirportId,
					departureTime,
				},
				transaction,
				type: sequelize.QueryTypes.SELECT,
			}
		);

		return airplanes;
	}

	// Check airplane availability
	async isAirplaneAvailable(
		airplaneId,
		departureAirportId,
		departureTime,
		transaction
	) {
		// SQL query to find available airplanes based on the last flight
		const [airplane] = await sequelize.query(
			`
            SELECT a.*, lf.*
            FROM airplanes a 
            LEFT JOIN (
                -- Subquery to get the last flight for the given airplane
                SELECT f.airplaneId, f.arrivalAirportId, f.arrivalTime
                FROM flights f
                WHERE f.airplaneId = :airplaneId
                ORDER BY f.arrivalTime DESC LIMIT 1
            ) lf ON lf.airplaneId = a.id
            
            -- Check if the airplane is available
            WHERE a.id = :airplaneId
            AND (
                (lf.airplaneId IS NULL) -- Airplane has no flight history
                OR (lf.arrivalAirportId = :departureAirportId AND lf.arrivalTime < DATE_SUB(:departureTime, INTERVAL 2 HOUR)) -- Last flight landed at the departure airport and at least 2 hours before the departure time
            )
            `,
			{
				replacements: {
					airplaneId,
					departureAirportId,
					departureTime,
				},
				transaction,
				type: sequelize.QueryTypes.SELECT,
			}
		);

		console.log(airplane);

		return !!airplane; // Returns true if airplane is available, false otherwise
	}
}

module.exports = new AirplaneRepository();
