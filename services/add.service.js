const db = require('../database/index');
const Genrals = require('../utils/genral-components');

module.exports = class addservice {
	constructor(table) {
		this.table = table;
	}

	addToDatabase(army) {
		return this.theAddService(army);
	  }

	async theAddService(army) {
		try {
			const instance = new Genrals();
			const formatedData = instance.formatData(army);

			const query = {
				text: `INSERT INTO ${this.table}(${formatedData[0].join(', ')}) VALUES(${formatedData[1].join(
					', '
				)}) RETURNING _id`,
				values: formatedData[2],
			};

			return db.query(query);
		} catch (e) {
		  throw e;
		}
	  }
};
