'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'vaprowave',
    aliases: ['vp'],
    dj: true,
    cooldown: 2,
    run: async (_client, message) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const mode = queue.filters.ffmpeg.isEnabled('vaporwave') ? `wyłączony` : `włączony`;
        await queue.filters.ffmpeg.toggle(['vaporwave', 'normalizer']);

        return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Vaporwave został \`${mode}\`!**` })] });
    }
};