const router = require('express').Router();

 const { runSeed } = require('../controllers/seed');

router.post('/seed-data', runSeed);
module.exports = router;
