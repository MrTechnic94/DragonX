'use strict';

const { EmbedBuilder, ActivityType } = require('discord.js');

exports.run = async (client, message) => {

    const p = process.env.PREFIX;

    client.user.setPresence({activities: [{name: `❓ ${p}help 🎵 ${p}play`, type: ActivityType.Listening}], status: 'online'});

    const embed = new EmbedBuilder()
    .setTitle("✅ Pomyślnie wyczyszczony status!")
    .setDescription(`Status został zmieniony na: \`\`❓ ${p}help 🎵 ${p}play\`\``)
    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setColor("Green")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "sclear",
    owner: true
};