'use strict';

const { EmbedBuilder, ActivityType } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' });

exports.run = async (client, message) => {

    if (message.author.id == process.env.OWNER) {

        const p = process.env.PREFIX;

        client.user.setPresence({ activities: [{ name: `❓ ${p}help 🎵 ${p}play`, type: ActivityType.Listening }], status: 'online' });

        const embed = new EmbedBuilder()
            .setTitle("✅ Pomyślnie wyczyszczony status!")
            .setDescription(`Status został zmieniony na: \`\`❓ ${p}help 🎵 ${p}play\`\``)
            .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor("Green")

        return message.reply({embeds: [embed]})

    } else {

        const _embed = new EmbedBuilder()
            .setTitle("❌ Błąd!")
            .setDescription(`Status nie został wyczyszczony!`)
            .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor("Red")

        return message.reply({embeds: [_embed]})

    };
};

exports.info = {
    name: "sclear"
}