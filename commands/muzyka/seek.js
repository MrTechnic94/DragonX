'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    const queue = client.player.nodes.get(message.guild.id);
    const s = parseInt(args[0]);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    if (s * 1000 >= queue.currentTrack.durationMS) return message.reply({embeds: [embeds.time_seek_error]});

    if (!s || s <= 0) return message.reply({embeds: [embeds.number_error]});

    await queue.node.seek(s * 1000);
    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Ustawiono odtwarzanie na: ${queue.node.getTimestamp().current.label}!**`).setColor('Red')]});
};

exports.info = {
    name: "seek",
    aliases: ['se'],
    dj: true
};