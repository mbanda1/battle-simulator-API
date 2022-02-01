const db = require('../database/index');
 
module.exports = class BattleService {
	getBattles() {
		return this.gerService();
	  }

	async gerService() {
		try {
			const dbQuery = {
				text: ' SELECT bt.name FROM battles bt ORDER BY  name',
			  };

			return db.query(dbQuery)
			  .then((getData) => getData.rows);
		} catch (e) {
		  throw e;
		}
	  }
};
