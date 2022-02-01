const router = require('express').Router();

const {
	addOne, getMany,
} = require('../controllers/battle');

router.post('/add-one', addOne);
router.get('/get-many', getMany);

module.exports = router;
