'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'status',
    owner: true,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send({ embeds: [messageEmbeds.args_status_error] });

        const query = args[0] === 'clear' ? process.env.STATUS_NAME : args.join(' ');

        client.user.setPresence({ activities: [{ name: query }] });

        message.channel.send({ embeds: [createEmbed({ description: `✅ **Status został zmieniony na:** \`\`${query}\`\`` })] });
    }
};