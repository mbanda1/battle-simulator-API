/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
const db = require('../database/index');
const Games = require('./games');
const logger = require('../utils/logger');
const AddService = require('./add.service');

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
module.exports = class BattleService {
	getBattles() {
		return this.gerService();
	}

	async gerService() {
		return new Promise((resolve, reject) => {
			const dbQuery = {
				text: ' SELECT bt.name, bt._id FROM battles bt ORDER BY  name',
			};

			db.query(dbQuery)
				.then((getData) => resolve(getData.rows))
				.catch((e) => reject(e));
		});
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
							} else {
								toBeAttacked.units = 0;
								originalA = originalA.map(
									(obj) => [toBeAttacked].find((o) => o._id === obj._id) || obj
								);
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
};
