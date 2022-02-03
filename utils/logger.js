require('dotenv').config();
const winston = require('winston');

const dateFormat = () => new Date(Date.now()).toUTCString();

winston.addColors({
	error: 'red',
	warn: 'yellow',
	info: 'blue',
	debug: 'green',
});

const loggerDev = (logType, msg, obj, route) => {
	const logger = winston.createLogger({
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({
				filename: `./logs/logFiles/${route}.log`,
			}),
		],
		format: winston.format.printf((info) => {
			let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${
				info.message
			} | `;
			message = info.obj ? `${message}data:${JSON.stringify(info.obj)} | ` : message;
			return message;
		}),
	});

	logger.log(logType, msg, {
		obj,
	});
};

module.exports = {
	async info(message, obj, route) {
		loggerDev('info', message, obj, route);
	},
};
