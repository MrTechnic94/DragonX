'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const mode = queue.filters.ffmpeg.isEnabled('lofi') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['lofi', 'normalizer']);

    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Lofi został ${mode}!**`).setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor(queue.filters.ffmpeg.isEnabled('lofi') ? `Green` : `Red`)]});
};

exports.info = {
    name: "lofi",
    aliases: ["lf"],
    dj: true
};