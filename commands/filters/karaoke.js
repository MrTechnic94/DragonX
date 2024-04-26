'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'karaoke',
    aliases: ['ka'],
    dj: true,
    cooldown: 2,
    run: async (_client, message) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        if (queue.filters.ffmpeg.getFiltersEnabled().length >= 1 && queue.filters.ffmpeg.isDisabled('karaoke')) return message.channel.send({ embeds: [messageEmbeds.max_filters_enabled_error] });

        const mode = queue.filters.ffmpeg.isEnabled('karaoke') ? `wyłączony` : `włączony`;
        await queue.filters.ffmpeg.toggle(['karaoke', 'normalizer']);

        return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Karaoke został \`${mode}\`!**` })] });
    }
};