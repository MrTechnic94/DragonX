'use strict';

const config = require('../../config/default.js');
const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'status',
    owner: true,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.args_status_error] });

        const query = args[0] === 'clear' ? config.presence.activities[0].name : args.join(' ');

        client.user.setPresence({ activities: [{ name: query }] });

        message.channel.send({ embeds: [createEmbed({ description: `✅ **Status został zmieniony na \`${query}\`**` })] });
    }
};