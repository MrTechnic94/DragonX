'use strict';

const { EmbedBuilder, ActivityType } = require('discord.js');

exports.run = async (client, message) => {
    client.user.setPresence({activities: [{name: process.env.STATUSTWO, type: ActivityType.Listening}], status: 'online'});

    return message.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle(`✅ Pomyślnie wyczyszczono status`)
                .setDescription(`Status został zmieniony na: \`\`${process.env.STATUSTWO}\`\``)
                .setColor('Red')]
    });
};

exports.info = {
    name: "sclear",
    owner: true
};