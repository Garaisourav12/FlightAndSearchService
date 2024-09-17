const dataMissing = (...data) => {
	return data.some((item) => item === undefined || item === null);
};

const successResponse = (res, data, statusCode, message) => {
	return res.status(statusCode).json({
		success: true,
		message,
		data,
	});
};

const errorResponse = (res, error) => {
	return res.status(error.statusCode).json({
		success: false,
		error: error.message,
	});
};

module.exports = { dataMissing, successResponse, errorResponse };
