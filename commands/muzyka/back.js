'use strict'

const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie gram żadnej piosenki!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

    try {
    await queue.back();

    return message.reply({embeds: [new MessageEmbed().setTitle(`◀ Właśnie odtwarzam poprzeniu utwór`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

    } catch (error) {
        message.reply({embeds: [new MessageEmbed().setTitle(`❌ Nie ma poprzedniego utwór!`).setColor("RED")]});
    }

};

exports.info = {
    name: "back"
}