'use strict';

const logger = require('../../utils/consoleLogger');
const messageEmbeds = require('../../utils/messageEmbeds');

module.exports = {
	name: 'playerError',
	async run(_client, queue, err) {
		logger.error(err);
		return queue.metadata.send({ embeds: [messageEmbeds.player_error] });
	},
};