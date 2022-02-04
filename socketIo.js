/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
const Games = require('./services/games');
const logger = require('./utils/logger');
const uuidv4 = require('uuid').v4;
const AddService = require('./services/add.service');

const messages = new Set();

const messageExpirationTimeMS = 2 * 60 * 1000; // 2 minutes

function updateGameResults(result) {
	const resultJoin = [];
	result.forEach((array) => {
		array.forEach((element) => {
			resultJoin.push(element);
		});
	});

	const instance = new AddService('games');
	return instance
		.addToDatabase({
			results: JSON.stringify(resultJoin),
		});
}

class Connection {
	constructor(io, socket) {
		this.socket = socket;
		this.io = io;

		socket.on('message', (value) => this.handleMessage(value));
		socket.on('disconnect', () => this.disconnect());
		socket.on('connect_error', (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
	}

	sendMessage(msg) {
		const message = {
			id: uuidv4(),
			...msg
		};

		messages.add(message);

		this.io.sockets.emit('message', message);
		

		setTimeout(() => {
			this.io.sockets.emit('deleteMessage', message.id);
		}, messageExpirationTimeMS);
	}

	handleMessage(value) {
		if (value === 'game') {
 			this.initiateGame();
		} else {
			const message = {
				id: uuidv4(),
			};

			messages.add(message);
			this.sendMessage(message);
		}
	}

	disconnect() {
		console.log('Socket Disconnected');
	}

	async initiateGame() {
		try {
			const instance = new Games();

			const getBattleClusters = await instance.gamesWithMorethanThreeArmies();

			const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

			/** War is among armies belonging to a same cluster alone
       * concurent wars take place depending on number of battle groups intialized
       * each battle group has atleast 3 wariors fighting
       */

			const lastState = [];

			for (const [battle, warriors] of Object.entries(getBattleClusters)) {
				let originalA = warriors; // Arrays to army in same category of war
				let stillHasStrength = 0; // verify if army has 10 points and above

				do {
					/** Check if more than 1 army is still standing */
					const standing = warriors.filter((d) => d.units > 0);
					const standingWarios = standing.length;

					if (standingWarios > 1) {
						// get random attacker from the number
						const attackerIndex = randomIntFromInterval(0, standingWarios - 1);

						const randomAtacker = standing[attackerIndex]; // Object

						// check if randomAtacker has success possiblity
						// based on current units (min = 10

						/** Not every attack is successful. The Army has 1% of success for
             *  every unit in it to aminimum of 10%
             * */
						const canSucced = randomAtacker.units >= 10;

						if (canSucced) {
							let toBeAttacked = {};
							if (randomAtacker.attack === 'random') {
								// attack random army

								let toBeAttackedIndex;

								/** randomly get patner to attack */
								while (
									toBeAttackedIndex === undefined
                  || toBeAttackedIndex === randomAtacker
								) {
									toBeAttackedIndex = randomIntFromInterval(0, standingWarios - 3);
								}
								toBeAttacked = standing[toBeAttackedIndex];
							} else if (randomAtacker.attack === 'weakest') {
								// attack weckest army

								toBeAttacked = standing.reduce((prev, curr) => (prev.units < curr.units ? prev : curr));
							} else {
								// attck strongest

								toBeAttacked = standing.reduce((prev, curr) => (prev.units > curr.units ? prev : curr));
							}

							const unitsOfAttacked = toBeAttacked.units;

							/** attack deductions
               * Suffering Loss
               */
							if (unitsOfAttacked > 1) {
								toBeAttacked.units = unitsOfAttacked / 2;
								originalA = originalA.map(
									(obj) => [toBeAttacked].find((o) => o._id === obj._id) || obj
								);

								/** Send Update through Socket.Io */
								const message = {
									battle: randomAtacker.battle,
									attacker: randomAtacker.army,
									attacked: toBeAttacked.army,
									lostUnits: unitsOfAttacked / 2,
 									life: 'Alife',
								};

								this.sendMessage(message);
							} else {
								toBeAttacked.units = 0;
								originalA = originalA.map(
									(obj) => [toBeAttacked].find((o) => o._id === obj._id) || obj
								);

								const message = {
									battle: randomAtacker.battle,
									attacker: randomAtacker.army,
									attacked: toBeAttacked.army,
									lostUnits: unitsOfAttacked,
 									life: 'Dead',
								};

								this.sendMessage(message);
							}
						}
					}
					/**
           * 10 % is the minimum strength number
           * after which the army is prone to be attacked but itself cant attack
           */
					stillHasStrength = originalA.filter((obj) => obj.units >= 10).length;

					logger.info({}, originalA, 'game.result');
				} while (stillHasStrength >= 2);
				lastState.push(originalA);
			}

			await updateGameResults(lastState, getBattleClusters);
			return 'Check Logs / Database for  final results status';
		} catch (error) {
			console.log({ error });
			throw error;
		}
	}
}

function chat(io) {
	io.on('connection', (socket) => {
		console.log('Socket connected');
		new Connection(io, socket);
	});
}

module.exports = chat
