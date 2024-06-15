'use strict';

const logger = require('../../utils/consoleLogger');

module.exports = {
	name: 'uncaughtException',
	async run(_client, err) {
		return logger.error(err);
	},
};