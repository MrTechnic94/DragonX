'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');

module.exports = {
	name: 'playerError',
	async run(_client, queue) {
		return queue.metadata.send({ embeds: [messageEmbeds.player_error] });
	},
};