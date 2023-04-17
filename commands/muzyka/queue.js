'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek w playliście!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const tracks = queue.tracks.map((track, i) => `**${i + 1}.** [${track.title}](${track.url}) [${track.duration}]`);
    const songs = queue.tracks.size;
    const nextSongs = songs > 20 ? `${songs - 20} piosenki` : `w playliście ${songs} piosenka(i)`;

    const embed = new EmbedBuilder()
    .setTitle('📰 Piosenki w playliście')
    .setDescription(`**Teraz odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Następne:**\nBrak piosenek`)
    .setColor("Red")

    if (queue.tracks.at(0)) {
        embed.setDescription(`**Teraz odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) [${queue.currentTrack.duration}]\n\n**Następne:**\n${tracks.slice(0, 20).join('\n')}`)
        embed.setFooter({text: nextSongs})
    };

    return message.reply({embeds: [embed]});
};

exports.info = {
    name: "queue",
    aliases: ['q']
};
