const db = require('../database/index');

module.exports = class AttackStrategyService {
	legitGames() {
		return this.gamesWithMorethanThreeArmies();
	}

	async gamesWithMorethanThreeArmies() {
		return new Promise((resolve, reject) => {
			const dbQuery = {
				text: `
                            select
                            b."name" as "battle", a."name" as "army", a."_id", a.battleId, a.units , as2."name" as "attack"
                            from battles b
                              inner join armies a
                              on a.battleid = b."_id"
                                inner join attack_strategy as2
                            on as2."_id" = a.attackstrategyid `,
			};

			db.query(dbQuery)
			.then((d) => {
				const arrayData = d.rows;

				const arr = [];
				for (const object of arrayData) {
					const value = object.battle;
					if (
						arrayData.reduce((acc, cur) => (cur.battle === value ? ++acc : acc), 0) >= 3
					) {
						arr.push(object);
					}
				}

					return arr;
				})
				.then((array) => {
					const groupByBattle = (list, key) =>
					list.reduce(
					  (hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }),
					  {}
					);

				return groupByBattle(array, 'battle');
 				})
				.then(async (res) => resolve(res))
				.catch((e) => reject(e));
		});
	}

	async getPlayedGames() {
		return new Promise((resolve, reject) => {
			const dbQuery = {
				text: ' SELECT g.results, g._id FROM games g ORDER BY  results',
			};

			db.query(dbQuery)
				.then((getData) => resolve(getData.rows))
				.catch((e) => reject(e));
		});
	}
};
