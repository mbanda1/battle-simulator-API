const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const errors = require('./errors');
const routes = require('./routes');

const app = express();

const jsonParser = express.json();
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(jsonParser);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use(routes);

app.use(errorHandler.internalServerErrorHandler(errors));
app.use(errorHandler.missingRouteErrorHandler(errors));
app.use(errorHandler.conflictErrorHandler(errors));

module.exports = app;
