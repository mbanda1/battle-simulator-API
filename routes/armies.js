const router = require('express').Router();

const {
	addOne,
} = require('../controllers/armies');

router.post('/add-one', addOne);

module.exports = router;
