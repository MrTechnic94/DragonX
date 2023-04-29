'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const progresbar = queue.node.createProgressBar({timecodes: false, length: 13});
    const emoji = queue.node.isPaused() ? `▶️` : `⏸️`;
    const requester = queue.currentTrack.requestedBy ?? `brak`;

    const embed = new EmbedBuilder()
    .setTitle(`⚡ Teraz Odtwarzam`)
    .setDescription(`**Tytuł:** [${queue.currentTrack.title}](${queue.currentTrack.url})\n**Poziom głośności:** ${queue.node.volume}%\n**Na prośbę:** ${requester}\n\n${emoji} | ${progresbar} ${queue.node.getTimestamp().current.label} / ${queue.currentTrack.duration}`)
    .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setThumbnail(queue.currentTrack.thumbnail)
    .setColor("6b3deb")

    return message.reply({embeds: [embed]});

};

exports.info = {
    name: "nowplaying",
    aliases: ['np']
};
