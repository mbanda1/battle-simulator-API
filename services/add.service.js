const db = require('../database/index');
const Genrals = require('../utils/genral-components');
const logger = require('../utils/logger');

module.exports = class addservice {
	constructor(table) {
		this.table = table;
	}

	addToDatabase(data) {
		return this.theAddService(data);
	}

	async theAddService(data) {
		if (this.table === 'armies' && typeof data.attackStrategyId === 'string') {
			data.units = Number(data.units);
			data.battleId = Number(data.battleId);

			const dbQuery = {
				text: `SELECT a._id FROM attack_strategy a where name='${data.attackStrategyId}'`,
			};

			const checkArmy = await db.query(dbQuery);
			// eslint-disable-next-line no-underscore-dangle
			data.attackStrategyId = checkArmy.rows[0]._id;
 		}

		return new Promise((resolve, reject) => {
			const instance = new Genrals();
			const formatedData = instance.formatData(data);

			const query = {
				text: `INSERT INTO ${this.table}(${formatedData[0].join(
					', '
				)}) VALUES(${formatedData[1].join(', ')}) RETURNING _id`,
				values: formatedData[2],
			};

			db.query(query)
				.then(async (xml) => {
					logger.info({}, xml, 'as.service');
					resolve(xml);
				})
				.catch((e) => reject(e));
		});
	}
};
