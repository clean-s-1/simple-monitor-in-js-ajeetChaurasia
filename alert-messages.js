class AlertMessage {
	constructor() {}

	rangeMessage(parameter) {
		console.log(`${parameter} is out of range!`);
	}

	warningMessage(warningMessage, statusMessage) {
		console.log(`${warningMessage} Warning: Approaching ${statusMessage}`);
	}
}

module.exports = new AlertMessage();
