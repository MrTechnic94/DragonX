'use strict';

const embeds = require('../../utils/embeds');
const { createEmbed } = require('../../utils/embedCreator');

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