require('dotenv').config();
const configs = require('./config/envroment-variables.json');

const express = require('./app');
const server = require('./httpClinet');
require('./socketIo');

server.on('request', express);

server.listen(configs.port, () => {
	console.log(`Battle Simulator listening on port ${configs.port}`);
});

process.on('exit', () => {
	console.error('Process Ended !');
});
