const db = require('../database/index');

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
};
