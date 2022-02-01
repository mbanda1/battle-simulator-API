const configs = require('dotenv').config().parsed;
const { Pool } = require('pg');
// const logger = require('../utils/logger');

const USER = configs.PGUSER_PR;
const HOST = configs.PGHOST_PR;
const DATABASE = configs.PGDATABASE_PR;
const PASSWORD = configs.PGPASSWORD_PR;
const PORT = configs.PGPORT_PR;

const dbPool = new Pool({
	user: USER,
	host: HOST,
	database: DATABASE,
	password: PASSWORD,
	port: PORT,
});

dbPool.connect().then(
	(status) => {
		console.log(
			`DB conneted, host: ${status.connectionParameters.host}: ${status.connectionParameters.port}`
		);
	},
	(e) => {
		console.error({ ERROR: 'DB Connection failed', status: e.toString() });
	}
);

dbPool.on('error', (err, client) => {
	console.error({ ERROR: 'DB ERROR', errors: err.toString(), client });
});

module.exports = dbPool;
