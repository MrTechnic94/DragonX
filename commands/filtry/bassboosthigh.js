'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const mode = queue.filters.ffmpeg.isEnabled('bassboost_high') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['bassboost_high', 'normalizer']);

    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Wysoki Bassboost został ${mode}!**`).setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor(queue.filters.ffmpeg.isEnabled('bassboost_high') ? `Green` : `Red`)]});

};

exports.info = {
    name: "bassboosthigh",
    aliases: ["bsh"],
    dj: true
};