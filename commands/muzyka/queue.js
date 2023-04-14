'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setColor("Red")]});

    if (!queue.tracks[0]) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek w kolejce! Właśnie gram ostatnią!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return await message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const tracks = queue.tracks.map((track, i) => `**${i + 1}.** ${track.title} - ${track.requestedBy}`);
    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `\n\n**${songs - 5}** piosenka(i)` : `\n\nW playliście **${songs}** piosenka(i)`;

    const embed = new EmbedBuilder()
    .setTitle('📰 Piosenki w kolejce')
    .setDescription(`🏆 ${queue.current.title} - ${queue.current.requestedBy}\n${tracks.slice(0, 5).join('\n')}${nextSongs}`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Red")

    return message.reply({ embeds: [embed] });

};

exports.info = {
    name: "queue"
}