'use strict';

const { embeds } = require('../../utils/embeds.js');

exports.run = async (_client, message) => {
    await message.channel.send({ embeds: [embeds.restart_bot_success] });

    process.exit(1).catch(() => {
        return message.channel.send({ embeds: [embeds.catch_error] });
    });
};

exports.info = {
    name: "restart",
    owner: true
};