'use strict';

const redis = require('../../utils/redis.js');
const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'filters',
    aliases: ['f'],
    dj: true,
    cooldown: 2,
    run: async (_client, message, args) => {
        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        switch (args[0]?.toLowerCase()) {
            case 'clear':
                if (!queue.filters.ffmpeg.isEnabled('normalizer')) return message.channel.send({ embeds: [messageEmbeds.filters_error] });
                await queue.filters.ffmpeg.setFilters(false);
                return message.channel.send({ embeds: [messageEmbeds.disabled_filters_success] });
        };

        const filters = [
            { name: 'bassboost_low', label: 'BassBoost Low' },
            { name: 'bassboost', label: 'BassBoost' },
            { name: 'bassboost_high', label: 'BassBoost High' },
            { name: 'karaoke', label: 'Karaoke' },
            { name: 'nightcore', label: 'Nightcore' },
            { name: 'vaporwave', label: 'Vaporwave' },
            // { name: 'lofi', label: 'Lofi' },
            // { name: 'compressor', label: 'Compressor' },
            // { name: 'reverse', label: 'Reverse' }
        ];

        const embedFields = filters.map(filter => {
            const isEnabled = queue.filters.ffmpeg.isEnabled(filter.name);
            const status = isEnabled ? '🟢' : '🔴';
            return `${status} **${filter.label}**`;
        });

        const guildData = await redis.hgetall(message.guild.id);

        const prefix = guildData?.prefix ?? process.env.PREFIX;

        return message.channel.send({
            embeds: [
                createEmbed({
                    title: `📰 Lista filtrów`,
                    description: embedFields.join('\n'),
                    footer: {
                        text: `Przykładowe użycie: ${prefix}bassboost`
                    }
                })
            ]
        });
    }
};