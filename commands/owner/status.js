'use strict';

const { ActivityType } = require('discord.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({ embeds: [embeds.args_status_error] });

    switch (args[0]) {
        default:
            client.user.setPresence({ activities: [{ name: args.join(' '), type: ActivityType.Listening }], status: process.env.STATUS_TYPE });
            message.channel.send({ embeds: [createEmbed({ description: `✅ **Status został zmieniony na:** \`\`${args.join(' ')}\`\`` })] });
            break;

        case 'clear':
            client.user.setPresence({ activities: [{ name: process.env.STATUS_NAME, type: ActivityType.Listening }], status: process.env.STATUS_TYPE });
            message.channel.send({ embeds: [createEmbed({ description: `✅ **Status został zmieniony na:** \`\`${process.env.STATUS_NAME}\`\`` })] });
            break;
    };
};

exports.info = {
    name: "status",
    owner: true
};