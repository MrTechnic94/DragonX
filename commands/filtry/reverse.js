'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [embeds.voice_error]});

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    const mode = queue.filters.ffmpeg.isEnabled('reverse') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['reverse', 'normalizer']);

    return message.reply({embeds: [new EmbedBuilder().setDescription(`🎵 **Reverse został ${mode}!**`).setColor('Red')]});
};

exports.info = {
    name: "reverse",
    aliases: ["rv"],
    dj: true
};