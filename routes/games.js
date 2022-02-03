const router = require('express').Router();

const { getLegitGames, getPlayedGames } = require('../controllers/games');
const { game } = require('../controllers/battle');

router.get('/get-legit', getLegitGames);
router.post('/start-game', game);
router.get('/played-games', getPlayedGames);

module.exports = router;
