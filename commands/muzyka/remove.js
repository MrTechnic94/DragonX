'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    const queue = client.player.nodes.get(message.guild.id);
    const index = args[0] - 1;
    
    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (!args[0] || args[0] < 1 || args[0] > queue.getSize()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nieprawidłowa liczba!**`).setColor("Red")]});

    const track = queue.tracks.at(index);

    await queue.node.remove(index);
    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎯 **Usunięto: ${track.title}**!`).setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});
};

exports.info = {
    name: "remove",
    aliases: ['re'],
    dj: true
};