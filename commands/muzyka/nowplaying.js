'use strict';

const embeds = require('../../utils/embeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue) return message.channel.send({embeds: [embeds.queue_error]});

    const progresbar = queue.node.createProgressBar({timecodes: false, length: 13});
    const emoji = queue.node.isPaused() ? `▶️` : `⏸️`;
    const requester = queue.currentTrack.requestedBy ?? `brak`;
    
    return message.channel.send({
        embeds: [createEmbed({
            title: `⚡ Teraz odtwarzam`,
            description: `**Tytuł:** [${queue.currentTrack.title}](${queue.currentTrack.url})\n**Poziom głośności:** ${queue.node.volume}%\n**Na prośbę:** ${requester}\n\n${emoji} | ${progresbar} ${queue.node.getTimestamp().current.label} / ${queue.currentTrack.duration}`, thumbnail: queue.currentTrack.thumbnail
        })]
    });
};

exports.info = {
    name: "nowplaying",
    aliases: ["np"]
};