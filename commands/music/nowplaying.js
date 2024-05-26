'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { createEmbed } = require('../../utils/embedCreator');
const { useTimeline, usePlayer } = require('discord-player');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    cooldown: 2,
    async run(_client, message) {
        const node = usePlayer(message.guild.id);
        const timeline = useTimeline(message.guild.id);

        if (!timeline?.track) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const progresbar = node.createProgressBar({ timecodes: false, length: 13, leftChar: '[▬](https://top.gg/bot/1107363385676410910)' });
        const emoji = timeline.paused ? '▶️' : '⏸️';
        const requester = timeline.track.requestedBy ?? '**`brak`**';
        const author = timeline.track.author ?? 'nieznany';

        return message.channel.send({
            embeds: [
                createEmbed({
                    title: '⚡ Teraz odtwarzam',
                    description: `**Tytuł: [\`${timeline.track.cleanTitle}\`](${timeline.track.url})**\n**Autor: \`${author}\`**\n**Poziom głośności: \`${timeline.volume}%\`**\n**Na prośbę:** ${requester}\n\n${emoji} | ${progresbar} ${timeline.timestamp.current.label} / ${timeline.timestamp.total.label}`,
                    thumbnail: timeline.track.thumbnail
                }),
            ],
        });
    },
};