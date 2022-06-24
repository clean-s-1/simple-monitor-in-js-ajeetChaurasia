const AlertMessage = require('./alert-messages');
const ComposeBoundary = require('./compose-boundry');

class BatteryStatus {
	constructor() {}
	checkWarning(value, minValue, maxValue, tolerence, list, propertyName) {
		let inRange = ComposeBoundary.range(minValue, maxValue, value);
		let warnings = {
			min: function () {
				let withinTolenece = ComposeBoundary.range(
					minValue,
					minValue + tolerence,
					value
				);
				if (inRange && withinTolenece) {
					let getStatusMessage = ComposeBoundary.getStatus(list, value);
					AlertMessage.warningMessage(propertyName, getStatusMessage.name);
				}
			},
			max: function () {
				let withinTolenece = ComposeBoundary.range(
					maxValue - tolerence,
					maxValue,
					value
				);
				if (inRange && withinTolenece) {
					let getStatusMessage = ComposeBoundary.getStatus(list, value);
					AlertMessage.warningMessage(propertyName, getStatusMessage.name);
				}
			},
		};
		return warnings.min() || warnings.max();
	}

	checkMinValue(minValue, value) {
		return value < minValue;
	}

	checkMaxValue(maxValue, value) {
		return value > maxValue;
	}

	checkMinMaxValue(type, value, minValue, maxValue) {
		let notOk =
			this.checkMinValue(minValue, value) ||
			this.checkMaxValue(maxValue, value);
		if (notOk) {
			AlertMessage.rangeMessage(type);
		}
		return !notOk;
	}

	checkChargeRate(type, value, maxValue) {
		let notOk = this.checkMaxValue(maxValue, value);
		if (notOk) {
			AlertMessage.rangeMessage(type);
		}
		return !notOk;
	}

	getTolerenceValue(value, tolerance) {
		return (value * tolerance) / 100;
	}
}

module.exports = new BatteryStatus();
