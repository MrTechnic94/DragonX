'use strict'

const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma piosenek do wyczyszczenia!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    await queue.clear();

    return message.reply({embeds: [new MessageEmbed().setDescription(`💨 **Kolejka zostala wyczyszczona!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("GOLD")]});

};

exports.info = {
    name: "clear"
}