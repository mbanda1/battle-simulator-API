const GameService = require('../services/games');

const success = true;

const getLegitGames = (req, res, next) => {
	const instance = new GameService();

	instance
		.legitGames()
		.then((data) => {
			res.status(201).json({
				success,
				data,
			});
		})
		.catch((error) => {
			next(error);
		});
};

const getPlayedGames = (req, res, next) => {
	const instance = new GameService();

	instance
		.getPlayedGames()
		.then((data) => {
			res.status(201).json({
				success,
				data,
			});
		})
		.catch((error) => {
			next(error);
		});
};

module.exports = {
	getLegitGames,
	getPlayedGames,
};
