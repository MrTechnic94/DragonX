'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds');

exports.run = async (_client, message) => {
    try {
        await message.channel.send({embeds: [createEmbed({description: `✅ **Restartowanie bota...**`})]});
        process.exit();
    } catch {
        return message.channel.send({embeds: [embeds.restart_error]});
    }
};

exports.info = {
    name: "restart",
    owner: true
};