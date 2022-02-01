const router = require('express').Router();

const battle = require('./battle');
const army = require('./armies');
const attack = require('./attack.strategy');

router.use('/battles', [battle]);
router.use('/armies', [army]);
router.use('/attack-strategy', [attack]);

module.exports = router;
