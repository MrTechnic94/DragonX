'use strict';

const { EmbedBuilder, ActivityType } = require('discord.js');

exports.run = async (client, message) => {

    client.user.setPresence({activities: [{name: process.env.STATUSTWO, type: ActivityType.Listening}], status: 'online'});

    const embed = new EmbedBuilder()
    .setTitle("✅ Pomyślnie wyczyszczono status!")
    .setDescription(`Status został zmieniony na: \`\`${process.env.STATUSTWO}\`\``)
    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
    .setColor("Green")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "sclear",
    owner: true
};