'use strict';

const { EmbedBuilder, ActivityType } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply({embeds: [embeds.args_status_error]});

    client.user.setPresence({activities: [{name: args.join(' '), type: ActivityType.Listening}]});

    const embed = new EmbedBuilder()
    .setTitle("✅ Pomyślnie ustawiono status!")
    .setDescription(`Status został zmieniony na \`\`${args.join(' ')}\`\``)
    .setColor('Red')

    return message.reply({embeds: [embed]});
};

exports.info = {
    name: "status",
    owner: true
};