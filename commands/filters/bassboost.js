'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { playerOptions } = require('../../config/default');
const { createEmbed } = require('../../utils/embedCreator');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'bassboost',
    aliases: ['bb', 'bass'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        if (queue.filters.ffmpeg.getFiltersEnabled().length >= playerOptions.maxFiltersEnabled && queue.filters.ffmpeg.isDisabled('bassboost')) return message.channel.send({ embeds: [messageEmbeds.max_filters_enabled_error] });

        const mode = queue.filters.ffmpeg.isEnabled('bassboost') ? 'wyłączony' : 'włączony';
        await queue.filters.ffmpeg.toggle(['bassboost', 'normalizer']);

        return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Bassboost został \`${mode}\`**` })] });
    },
};