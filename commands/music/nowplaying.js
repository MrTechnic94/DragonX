'use strict';

const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    const progresbar = queue.node.createProgressBar({ timecodes: false, length: 13, leftChar: '[▬](https://top.gg/bot/1107363385676410910)' });
    const emoji = queue.node.isPaused() ? `▶️` : `⏸️`;
    const requester = queue.currentTrack.requestedBy ?? `brak`;

    return message.channel.send({
        embeds: [
            createEmbed({
                title: `⚡ Teraz odtwarzam`,
                description: `**Tytuł:** [${queue.currentTrack.title}](${queue.currentTrack.url})\n**Poziom głośności:** ${queue.node.volume}%\n**Na prośbę:** ${requester}\n\n${emoji} | ${progresbar} ${queue.node.getTimestamp().current.label} / ${queue.currentTrack.duration}`,
                thumbnail: queue.currentTrack.thumbnail
            })
        ]
    });
};

exports.info = {
    name: "nowplaying",
    aliases: ["np"]
};