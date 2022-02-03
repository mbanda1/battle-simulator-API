const router = require('express').Router();

const battle = require('./battle');
const army = require('./armies');
const attack = require('./attack.strategy');
const games = require('./games');

router.use('/battles', [battle]);
router.use('/armies', [army]);
router.use('/attack-strategy', [attack]);
router.use('/games', [games]);

module.exports = router;
