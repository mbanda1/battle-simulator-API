const router = require('express').Router();

const { getLegitGames, getPlayedGames } = require('../controllers/games');
 
router.get('/get-legit', getLegitGames);
router.get('/played-games', getPlayedGames);

module.exports = router;
