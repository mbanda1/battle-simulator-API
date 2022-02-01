/**
  * Instance of missing root error
  */

module.exports = class MissingRouteError extends Error {
	constructor(...params) {
		super(...params);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, MissingRouteError);
		}

		this.name = 'MissingRouteError';
		this.date = new Date();
		this.message = 'Route not found.';
	}
};
