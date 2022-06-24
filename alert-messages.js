const translator = require('@vitalets/google-translate-api');

class AlertMessage {
	constructor() {}

	translateMessage(message) {
		translator(message, {
			to: languageCode,
		}).then((res) => console.log(res.text));
	}

	rangeMessage(parameter) {
		let message = `${parameter} is out of range!`;
		this.translateMessage(message);
	}

	warningMessage(warningMessage, statusMessage) {
		let message = `${warningMessage} Warning: Approaching ${statusMessage}`;
		this.translateMessage(message);
	}
}

module.exports = new AlertMessage();
