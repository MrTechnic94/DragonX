'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { clientOptions } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');

module.exports = {
    name: 'status',
    owner: true,
    cooldown: 2,
    async run(client, message, args) {
        if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.args_status_error] });

        const query = args[0] === 'clear' ? clientOptions.presence.activities[0].name : args.join(' ');

        client.user.setPresence({ activities: [{ name: query }] });

        return message.channel.send({ embeds: [createEmbed({ description: `✅ **Status został zmieniony na \`${query}\`**` })] });
    }
};