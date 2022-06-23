const { expect } = require('chai');
const {
	SocRange,
	RangeValues,
	ChargeRange,
	TemperatureRange,
} = require('./constants');
const BatteryStatus = require('./properties-monitor');

const tempMinValue = RangeValues.tempMinValue;
const tempMaxValue = RangeValues.tempMaxValue;
const socMinValue = RangeValues.socMinValue;
const socMaxValue = RangeValues.socMaxValue;
const chargeRateMinValue = RangeValues.chargeRateMinValue;
const chargeRateMaxValue = RangeValues.chargeRateMaxValue;
const TolerenceValue = RangeValues.tolerence;

const batteryStatusCheck = (type, value) => {
	var statusType = {
		temperature: function () {
			let tolerence = BatteryStatus.getTolerenceValue(
				tempMaxValue,
				TolerenceValue
			);
			BatteryStatus.checkWarning(
				value,
				tempMinValue,
				tempMaxValue,
				tolerence,
				TemperatureRange,
				'Temperature'
			);
			let tempIsOk = BatteryStatus.checkMinMaxValue(
				'Temperature',
				value,
				tempMinValue,
				tempMaxValue
			);
			return tempIsOk;
		},
		soc: function () {
			let tolerence = BatteryStatus.getTolerenceValue(
				socMaxValue,
				TolerenceValue
			);
			BatteryStatus.checkWarning(
				value,
				socMinValue,
				socMaxValue,
				tolerence,
				SocRange,
				'State of Charge'
			);
			let socIsOk = BatteryStatus.checkMinMaxValue(
				'State of Charge',
				value,
				socMinValue,
				socMaxValue
			);
			return socIsOk;
		},
		chargeRate: function () {
			let tolerence = BatteryStatus.getTolerenceValue(
				chargeRateMaxValue,
				TolerenceValue
			);
			BatteryStatus.checkWarning(
				value,
				chargeRateMinValue,
				chargeRateMaxValue,
				tolerence,
				ChargeRange,
				'Charge Rate'
			);
			let chargeRateIsok = BatteryStatus.checkChargeRate(
				'Charge Rate',
				value,
				chargeRateMaxValue
			);
			return chargeRateIsok;
		},
	};
	return statusType[type]();
};

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
expect(batteryIsOk(44, 101, 0.8)).to.be.false;

expect(batteryIsOk(25, 70, 0.7)).to.be.true;
expect(batteryIsOk(50, 80, 0.7)).to.be.false;

expect(batteryIsOk(20, 85, 0)).to.be.false;
expect(batteryIsOk(30, 70, 0.9)).to.be.false;
expect(batteryIsOk(60, 70, 1)).to.be.false;
expect(batteryIsOk(30, 85, 5)).to.be.false;
expect(batteryIsOk(45, 81, 0.4)).to.be.false;
