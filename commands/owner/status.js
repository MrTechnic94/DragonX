'use strict';

const { ActivityType } = require('discord.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    try {
        if (!args[0]) return message.channel.send({ embeds: [embeds.args_status_error] });

        switch (args[0]) {
            default:
                client.user.setPresence({ activities: [{ name: args.join(' '), type: ActivityType.Listening }] });
                message.channel.send({ embeds: [createEmbed({ description: `✅ **Status został zmieniony na:** \`\`${args.join(' ')}\`\`` })] });
                break;

            case 'clear':
                client.user.setPresence({ activities: [{ name: process.env.STATUSTWO, type: ActivityType.Listening }], status: 'online' });
                message.channel.send({ embeds: [createEmbed({ description: `✅ **Status został zmieniony na:** \`\`${process.env.STATUSTWO}\`\`` })] });
                break;
        };
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] })
    };
};

exports.info = {
    name: "status",
    owner: true
};