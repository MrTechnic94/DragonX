'use strict';

const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    const mode = queue.filters.ffmpeg.isEnabled('lofi') ? `wyłączony` : `włączony`;
    await queue.filters.ffmpeg.toggle(['lofi', 'normalizer']);

    return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Lofi został ${mode}!**` })] });
};

exports.info = {
    name: "lofi",
    aliases: ["lf"],
    dj: true
};