'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);
    
    if (!queue) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const progresbar = queue.node.createProgressBar({ timecodes: false, length: 13 });

    if (!queue.node.isPaused()) {
    const embed = new EmbedBuilder()
        .setTitle(`⚡ Teraz Odtwarzam`)
        .setDescription(`**Tytuł:** ${queue.currentTrack.title}\n**Poziom głośności:** ${queue.node.volume}%\n**Na prośbę:** ${queue.currentTrack.requestedBy}\n\n⏸️ | ${progresbar} ${queue.node.getTimestamp().current.label} / ${queue.currentTrack.duration}`)
        .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setThumbnail(queue.currentTrack.thumbnail)
        .setColor("6b3deb")

        return message.reply({embeds: [embed]});
    };

    if (queue.node.isPaused()) {
    const _embed = new EmbedBuilder()
        .setTitle(`⚡ Teraz Odtwarzam`)
        .setDescription(`**Tytuł:** ${queue.currentTrack.title}\n**Poziom głośności:** ${queue.node.volume}%\n**Na prośbę:** ${queue.currentTrack.requestedBy}\n\n▶️ | ${progresbar} ${queue.node.getTimestamp().current.label} / ${queue.currentTrack.duration}`)
        .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setThumbnail(queue.currentTrack.thumbnail)
        .setColor("6b3deb")

        return message.reply({embeds: [_embed]});
    };

};

exports.info = {
    name: "nowplaying",
    aliases: ['np']
};