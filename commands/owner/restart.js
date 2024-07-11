'use strict';

const logger = require('../../utils/consoleLogger');
const messageEmbeds = require('../../utils/messageEmbeds');

module.exports = {
    name: 'restart',
    owner: true,
    cooldown: 2,
    async run(_client, message) {
        try {
            await message.channel.send({ embeds: [messageEmbeds.restart_bot_success] });

            process.exit(1);
        } catch (err) {
            logger.error(err);
            return message.channel.send({ embeds: [messageEmbeds.catch_error] });
        }
    },
};