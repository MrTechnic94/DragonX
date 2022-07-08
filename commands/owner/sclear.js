'use strict';

const { MessageEmbed } = require('discord.js');
require('dotenv').config({ path: __dirname + '../../.env' })

exports.run = async (client, message, args) => {

    if (message.author.id == process.env.OWNER) {

    client.user.setPresence({ activities: [{ name: process.env.STATUSTWO, type: 'LISTENING' }], status: 'online' });

    const embed = new MessageEmbed()
    .setTitle("✅ Pomyślnie wyczyszczony status!")
    .setDescription(`Status został zmieniony na: \`\`${process.env.STATUSTWO}\`\``)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("GREEN")

    return message.reply({embeds: [embed]})

    } else {

    const embed = new MessageEmbed()
    .setTitle("❌ Błąd!")
    .setDescription(`Status nie został wyczyszczony!`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("RED")

    return message.reply({embeds: [embed]})

    }
};

exports.info = {
    name: "sclear"
}