const router = require('express').Router();

const {
	addOne,
} = require('../controllers/attack.strategy');

router.post('/add-one', addOne);

module.exports = router;
