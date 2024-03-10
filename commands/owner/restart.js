'use strict';

const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
    await message.channel.send({ embeds: [messageEmbeds.restart_bot_success] });

    process.exit(1).catch(() => {
        return message.channel.send({ embeds: [messageEmbeds.catch_error] });
    });
};

exports.info = {
    name: "restart",
    owner: true
};