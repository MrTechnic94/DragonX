'use strict';

const { createEmbed } = require('../../utils/embedCreator.js');
const { embeds } = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [embeds.voice_error] });

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [embeds.queue_error] });

    switch (args[0]?.toLowerCase()) {
        case 'clear':
            if (!queue.filters.ffmpeg.isEnabled('normalizer')) return message.channel.send({ embeds: [embeds.filters_error] });
            await queue.filters.ffmpeg.setFilters(false);
            return message.channel.send({ embeds: [createEmbed({ description: `🎵 **Wszystkie filtry zostały wyłączone!**` })] });
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

    return message.channel.send({
        embeds:
            [createEmbed({
                title: `📰 Lista filtrów`,
                description: embedFields.join('\n'),
                footer: {
                    text: `Przykładowe użycie: ${process.env.PREFIX}bassboost`
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