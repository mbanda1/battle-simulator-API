const AddService = require('../services/seeder');

const success = true;

const runSeed = (req, res, next) => {
	AddService()
		.then(() => {
			res.status(201).json({
				success,
			});
		})
		.catch((error) => {
			next(error);
		});
};

module.exports = {
	runSeed,
};
