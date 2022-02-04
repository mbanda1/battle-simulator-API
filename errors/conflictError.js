/**
 * Internal server error instance
 */
module.exports = class ConflictError extends Error {
	constructor(message, ...params) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ConflictError);
		}

		this.name = 'ConflictError';
		this.date = new Date();
		this.message = message;
	}
};
