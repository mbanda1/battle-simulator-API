module.exports.internalServerErrorHandler = (errors, logger) => (err, req, res, next) => {
	// log error

	console.error(err.stack);

	const e = new errors.InternalServerError();

	res.status(500);
	res.json(e);
};

module.exports.missingRouteErrorHandler = (errors) => (req, res, next) => {
	const e = new errors.MissingRouteError();

	res.status(404);
	res.json(e);
};


module.exports.conflictErrorHandler = (errors) => (err, req, res, next) => {
	if (err instanceof errors.ConflictError) {
	  res.status(409);
	  res.json(err);
	} else next(err);
  };
  