class ComposeBoundary {
	constructor(list, value) {
		this.list = list;
		this.value = value;
	}

	range(min, max, value) {
		let inRange = value >= min && value <= max;
		return inRange;
	}

	getStatus(list, value) {
		let status = {};
		for (let i = 0; i < list.length; i++) {
			if (this.range(list[i].range[0], list[i].range[1], value)) {
				status = {
					name: list[i].name,
					threshold: list[i].range[1],
				};
			}
			if (value <= list[0].range[0]) {
				status = {
					name: list[0].name,
					threshold: value,
				};
			}
			if (value >= list[list.length - 1].range[1]) {
				status = {
					name: list[list.length - 1].name,
					threshold: value,
				};
			}
			return status;
		}
	}
}

module.exports = new ComposeBoundary();
