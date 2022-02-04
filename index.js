require('dotenv').config();
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const configs = require('./config/envroment-variables.json');

const errorHandler = require('./middleware/errorHandler');
const errors = require('./errors');
const routes = require('./routes');
const chat = require('./socketIo');

const app = express();

const jsonParser = express.json();
const corsMiddleware = cors();

const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(corsMiddleware);
app.use(jsonParser);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use(routes);

app.use(errorHandler.internalServerErrorHandler(errors));
app.use(errorHandler.missingRouteErrorHandler(errors));
app.use(errorHandler.conflictErrorHandler(errors));

server.listen(configs.port, () => {
	console.log(`Battle Simulator- listening on port ${configs.port}`);
});

chat(io);

process.on('exit', () => {
	console.error('Process Ended !');
});
