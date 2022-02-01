const AddService = require('../services/add.service');

const success = true;

const addOne = (req, res, next) => {
	const { body } = req;
	const instance = new AddService('attack_strategy');


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


module.exports = {
	addOne,
};
