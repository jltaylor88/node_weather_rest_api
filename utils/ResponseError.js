// Custom response error
class ResponseError extends Error {
	code;

	constructor(message, options, errorCode) {
		super(message, options);
		this.code = errorCode;
	}
}

module.exports = ResponseError;

