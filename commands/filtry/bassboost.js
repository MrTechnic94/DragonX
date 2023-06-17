'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

    const mode = queue.filters.ffmpeg.isEnabled('bassboost') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['bassboost', 'normalizer']);

    return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Bassboost został ${mode}!**` })] });
};

exports.info = {
    name: "bassboost",
    aliases: ["bb", "bass"],
    dj: true
};