'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    if (queue.history.previousTracks < 1) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma poprzedniego piosenek!**`).setColor("Red")]});

    await queue.history.back();
    return message.reply({embeds: [new EmbedBuilder().setDescription(`◀ **Odtwarzam poprzedni utwór!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("6b3deb")]});

};

exports.info = {
    name: "back",
    aliases: ['b']
};