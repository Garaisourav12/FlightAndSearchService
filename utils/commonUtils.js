const { HttpError } = require("../errors");

const dataMissing = (...data) => {
	return data.some((item) => item === undefined || item === null);
};

const isEmptyObject = (obj) => {
	return Object.keys(obj).length === 0;
};

const successResponse = (res, data, message, statusCode = 200) => {
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

const isHttpError = (error) => {
	return error instanceof HttpError;
};

module.exports = {
	dataMissing,
	isEmptyObject,
	successResponse,
	errorResponse,
	isHttpError,
};
