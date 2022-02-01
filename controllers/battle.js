const BattleService = require('../services/battles');
const AddService = require('../services/add.service');

const success = true;

const addOne = (req, res, next) => {
	const { body } = req;
	const instance = new AddService('battles');


	instance.addToDatabase(body)
	  .then(() => {
	    res.status(201).json({
	      success,
	    });
	  })
	  .catch((error) => {
	    next(error);
	  });
};

const getMany = (req, res, next) => {
 	const instance = new BattleService();

	instance.getBattles()
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
	addOne,
	getMany,
};
