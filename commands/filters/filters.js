'use strict';

const guildSettings = require('../../utils/guildSettings.js');
const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message, args) => {
    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    switch (args[0]?.toLowerCase()) {
        case 'clear':
            if (!queue.filters.ffmpeg.isEnabled('normalizer')) return message.channel.send({ embeds: [messageEmbeds.filters_error] });
            await queue.filters.ffmpeg.setFilters(false);
            return message.channel.send({ embeds: [messageEmbeds.disabled_filters_success]});
    };

    const filters = [
        { name: 'bassboost_low', label: 'BassBoost Low' },
        { name: 'bassboost', label: 'BassBoost' },
        { name: 'bassboost_high', label: 'BassBoost High' },
        { name: 'karaoke', label: 'Karaoke' },
        { name: 'nightcore', label: 'Nightcore' },
        { name: 'vaporwave', label: 'Vaporwave' },
        { name: 'lofi', label: 'Lofi' },
        { name: 'compressor', label: 'Compressor' },
        { name: 'reverse', label: 'Reverse' }
    ];

    const embedFields = [];

    for (const filter of filters) {
        const isEnabled = queue.filters.ffmpeg.isEnabled(filter.name);
        const status = isEnabled ? '🟢' : '🔴';
        embedFields.push(`${status} **${filter.label}**`);
    };

    const guildData = await guildSettings.findOne({ guildId: message.guild.id });

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
};

exports.info = {
    name: "filters",
    aliases: ["f"],
    dj: true
};