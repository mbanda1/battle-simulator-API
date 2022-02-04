const router = require('express').Router();

const battle = require('./battle');
const army = require('./armies');
const attack = require('./attack.strategy');
const games = require('./games');
const seed = require('./runSeed');

router.use('/battles', [battle]);
router.use('/armies', [army]);
router.use('/attack-strategy', [attack]);
router.use('/games', [games]);
router.use('/seed', [seed]);

module.exports = router;
