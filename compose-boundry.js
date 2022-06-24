class ComposeBoundary {
	constructor(list, value) {
		this.list = list;
		this.value = value;
	}

	range(min, max, value) {
		let inRange = value >= min && value <= max;
		return inRange;
	}

	checkValueIsLessThanMinimum(value, listData) {
		if (value <= listData.range[0]) {
			return {
				name: listData.name,
				threshold: value,
			};
		}
	}

	checkValueIsMoreThanMaximum(value, listData) {
		if (value >= listData.range[1]) {
			return {
				name: listData.name,
				threshold: value,
			};
		}
	}

	inBetweenMinAndMax(value, listData) {
		for (let i = 0; i < listData.length; i++) {
			if (this.range(listData[i].range[0], listData[i].range[1], value)) {
				return {
					name: listData.name,
					threshold: listData.range[1],
				};
			}
		}
	}

	getStatus(list, value) {
		let rangeType = {
			inBetween: function () {
				let data = this.inBetweenMinAndMax(value, list);
				return data;
			},
			minStatus: function () {
				let data = this.checkValueIsLessThanMinimum(value, list[0]);
				return data;
			},
			maxStatus: function () {
				let data = this.checkValueIsMoreThanMaximum(
					value,
					list[list.length - 1]
				);
				return data;
			},
		};

		return (
			rangeType['inBetween'] || rangeType['minStatus'] || rangeType['maxStatus']
		);
	}
}

module.exports = new ComposeBoundary();
