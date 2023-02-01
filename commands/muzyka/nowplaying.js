'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);
    
    if (!queue || !queue.playing) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const progresbar = queue.createProgressBar({ timecodes: false, length: 13 });

    if (!queue.connection.paused) {
    const embed = new EmbedBuilder()
        .setTitle(`⚡ Teraz Odtwarzam`)
        .setDescription(`**Tytuł:** ${queue.current.title}\n**Poziom głośności:** ${queue.volume}%\n**Na prośbę:** ${queue.current.requestedBy}\n\n⏸️ | ${progresbar} ${queue.getPlayerTimestamp().current} / ${queue.current.duration}`)
        .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setThumbnail(queue.current.thumbnail)
        .setColor("6b3deb")

        return message.reply({embeds: [embed]});
    };

    if (queue.connection.paused) {
    const _embed = new EmbedBuilder()
        .setTitle(`⚡ Teraz Odtwarzam`)
        .setDescription(`**Tytuł:** ${queue.current.title}\n**Poziom głośności:** ${queue.volume}%\n**Na prośbę:** ${queue.current.requestedBy}\n\n▶️ | ${progresbar} ${queue.getPlayerTimestamp().current} / ${queue.current.duration}`)
        .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setThumbnail(queue.current.thumbnail)
        .setColor("6b3deb")

        return message.reply({embeds: [_embed]});
    };

};

exports.info = {
    name: "nowplaying",
    aliases: ['np']
}