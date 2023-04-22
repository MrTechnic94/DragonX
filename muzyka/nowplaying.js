'use strict';

const { EmbedBuilder } = require('discord.js');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    const progresbar = queue.node.createProgressBar({timecodes: false, length: 13});
    const emoji = queue.node.isPaused() ? `▶️` : `⏸️`;
    const requester = queue.currentTrack.requestedBy ?? `brak`;

    const embed = new EmbedBuilder()
    .setTitle(`⚡ Teraz Odtwarzam`)
    .setDescription(`**Tytuł:** [${queue.currentTrack.title}](${queue.currentTrack.url})\n**Poziom głośności:** ${queue.node.volume}%\n**Na prośbę:** ${requester}\n\n${emoji} | ${progresbar} ${queue.node.getTimestamp().current.label} / ${queue.currentTrack.duration}`)
    .setThumbnail(queue.currentTrack.thumbnail)
    .setColor('Red')

    return message.reply({embeds: [embed]});
};

exports.info = {
    name: "nowplaying",
    aliases: ['np']
};