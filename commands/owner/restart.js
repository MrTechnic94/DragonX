'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'restart',
    owner: true,
    cooldown: 2,
    run: async (_client, message) => {
        await message.channel.send({ embeds: [messageEmbeds.restart_bot_success] });

        process.exit(1).catch(() => {
            return message.channel.send({ embeds: [messageEmbeds.catch_error] });
        });
    }
};