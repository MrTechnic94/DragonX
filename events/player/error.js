'use strict';

const logger = require('../../utils/consoleLogger');
const messageEmbeds = require('../../utils/messageEmbeds');

module.exports = {
	name: 'error',
	async run(_client, queue, err) {
		logger.error(err);
		return queue.metadata.send({ embeds: [messageEmbeds.catch_error] });
	},
};