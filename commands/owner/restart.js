'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds');

exports.run = async (_client, message) => {
    await message.channel.send({ embeds: [createEmbed({ description: `✅ **Restartowanie bota...**` })] });

    process.exit().catch(() => {
        return message.channel.send({ embeds: [embeds.catch_error] });
    });
};

exports.info = {
    name: "restart",
    owner: true
};