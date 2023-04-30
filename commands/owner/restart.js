'use strict';

const embeds = require('../../utils/embeds');
const { createEmbed } = require('../../utils/embedCreator');

exports.run = async (_client, message) => {
    try {
        await message.reply({embeds: [createEmbed({description: `✅ **Restartowanie bota...**`})]});
        process.exit();
    } catch {
        return message.reply({embeds: [embeds.restart_error]});
    }
};

exports.info = {
    name: "restart",
    owner: true
};
