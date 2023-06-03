'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    try {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

        const queue = client.player.nodes.get(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

        const mode = queue.filters.ffmpeg.isEnabled('karaoke') ? `wyłączony` : `włączony`;
        await queue.filters.ffmpeg.toggle(['karaoke', 'normalizer']);

        return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Karaoke został ${mode}!**` })] });
    } catch {
        return message.channel.send({ embeds: [embeds.catch_error] })
    };
};

exports.info = {
    name: "karaoke",
    aliases: ['ka'],
    dj: true
};