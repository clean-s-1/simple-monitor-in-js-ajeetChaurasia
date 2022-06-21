const { expect } = require('chai');

const tempMinValue = 0;
const tempMaxValue = 45;
const socMinValue = 20;
const socMaxValue = 80;
const chargeRateMaxValue = 0.8;

const batteryStatusCheck = (type, value) => {
	var statusType = {
		temperature: function () {
			let tempIsOk = checkMinMaxValue(
				'Temperature',
				value,
				tempMinValue,
				tempMaxValue
			);
			return tempIsOk;
		},
		soc: function () {
			let socIsOk = checkMinMaxValue(
				'State of Charge',
				value,
				socMinValue,
				socMaxValue
			);
			return socIsOk;
		},
		chargeRate: function () {
			let chargeRateIsok = checkChargeRate(
				'Charge Rate',
				value,
				chargeRateMaxValue
			);
			return chargeRateIsok;
		},
	};
	return statusType[type]();
};

function checkMinValue(minValue, value) {
	return value < minValue;
}

function checkMaxValue(maxValue, value) {
	return value > maxValue;
}

function checkMinMaxValue(type, value, minValue, maxValue) {
	let notOk = checkMinValue(minValue, value) || checkMaxValue(maxValue, value);
	if (notOk) {
		alertMessage(type);
	}
	return !notOk;
}

function checkChargeRate(type, value, maxValue) {
	let notOk = checkMaxValue(maxValue, value);
	if (notOk) {
		alertMessage(type);
	}
	return !notOk;
}

function alertMessage(type) {
	console.log(`${type} is out of range!`);
}

function batteryIsOk(temperature, soc, charge_rate) {
	let tempStatus = batteryStatusCheck('temperature', temperature);
	let SOCStatus = batteryStatusCheck('soc', soc);
	let chargeRateStatus = batteryStatusCheck('chargeRate', charge_rate);
	return tempStatus && SOCStatus && chargeRateStatus;
}

expect(batteryIsOk(50, 70, 0.7)).to.be.false;
expect(batteryIsOk(25, 90, 0.7)).to.be.false;
expect(batteryIsOk(50, 80, 0.7)).to.be.false;

expect(batteryIsOk(20, 85, 0)).to.be.false;
expect(batteryIsOk(30, 70, 0.9)).to.be.false;
expect(batteryIsOk(60, 70, 1)).to.be.false;
expect(batteryIsOk(30, 85, 5)).to.be.false;
expect(batteryIsOk(45, 81, 0.4)).to.be.false;

expect(batteryIsOk(25, 70, 0.7)).to.be.true;
expect(batteryIsOk(50, 80, 0.7)).to.be.false;

expect(batteryIsOk(20, 85, 0)).to.be.false;
expect(batteryIsOk(30, 70, 0.9)).to.be.false;
expect(batteryIsOk(60, 70, 1)).to.be.false;
expect(batteryIsOk(30, 85, 5)).to.be.false;
expect(batteryIsOk(45, 81, 0.4)).to.be.false;
