'use strict';

const config = require('../../config/default');
const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'nightcore',
    aliases: ['nc'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        if (queue.filters.ffmpeg.getFiltersEnabled().length >= config.maxFiltersEnabled && queue.filters.ffmpeg.isDisabled('nightcore')) return message.channel.send({ embeds: [messageEmbeds.max_filters_enabled_error] });

        const mode = queue.filters.ffmpeg.isEnabled('nightcore') ? 'wyłączony' : 'włączony';
        await queue.filters.ffmpeg.toggle(['nightcore', 'normalizer']);

        return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Nightcore został \`${mode}\`**` })] });
    }
};