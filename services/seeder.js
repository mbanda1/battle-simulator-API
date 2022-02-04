/* eslint-disable no-loop-func */
/* eslint-disable no-underscore-dangle */
const db = require('../database/index');
const Genrals = require('../utils/genral-components');

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const seed = async () => {
	try {
		await db.query('DELETE FROM attack_strategy');
		console.log('Deleted all record in attack strategy');

		await db.query('DELETE FROM battles');
		console.log('Deleted all record in battles');

		await db.query('DELETE FROM armies');
		console.log('Deleted all record in armies');

		const instance = new Genrals();

		const attackS = ['random', 'weakest', 'strongest'];
		const attackIds = [];
		attackS.forEach(async (name) => {
			const formatedData = instance.formatData({ name });

			const insertBattle = {
				text: `INSERT INTO attack_strategy(${formatedData[0].join(
					', '
				)}) VALUES(${formatedData[1].join(', ')}) RETURNING _id`,
				values: formatedData[2],
			};
			const res = await db.query(insertBattle);
			return attackIds.push(res.rows[0]._id);
		});

		return ['Battle1', 'Battle2', 'Battle3', 'Battle4', 'Battle5'].forEach(async (name) => {
			const formatedData = instance.formatData({ name });

			const insertBattle = {
				text: `INSERT INTO battles(${formatedData[0].join(
					', '
				)}) VALUES(${formatedData[1].join(', ')}) RETURNING _id`,
				values: formatedData[2],
			};
			const res = await db.query(insertBattle);

			let count = 0;
			while (count < 20) {
				const attackStr = attackIds;
				const randomIndex = Math.floor(Math.random() * attackStr.length);
				const attackStrategyId = attackStr[randomIndex];

				const army = {
					name: (Math.random() + 1).toString(36).substring(5),
					units: randomNumber(80, 100),
					battleId: res.rows[0]._id,
					attackStrategyId,
				};

				const formatedData2 = instance.formatData(army);

				const insertArmy = {
					text: `INSERT INTO armies(${formatedData2[0].join(
						', '
					)}) VALUES(${formatedData2[1].join(', ')}) RETURNING _id`,
					values: formatedData2[2],
				};
				db.query(insertArmy);
				count += 1;
			}
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports = seed;
