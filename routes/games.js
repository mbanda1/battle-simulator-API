const router = require('express').Router();

const { getLegitGames, getPlayedGames } = require('../controllers/games');
const { game } = require('../controllers/battle');

router.get('/get-legit', getLegitGames);
router.get('/start-game', game);
router.get('/played-games', getPlayedGames);

module.exports = router;
