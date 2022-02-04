module.exports = class genralComponents {
	formatData(data) {
		const columns = [];
		const positions = [];
		const values = [];

		Object.entries(data).forEach(([column, value], index) => {
			columns.push(column);
			values.push(value);
			positions.push(`$${(index += 1)}`);
		});

		return [columns, positions, values];
	}
};
