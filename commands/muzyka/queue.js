'use strict';

const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message) => {

    const queue = client.player.nodes.get(message.guild.id);

    if (!queue?.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setColor("Red")]});

    if (message.guild.members.me?.voice.channelId && message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie jesteś na moim kanale głosowym!**`).setColor("Red")]});

    const tracks = queue.tracks.map((track, i) => `**${i + 1}.** [${track.title}](${track.url}) - ${track.requestedBy}`);
    const songs = queue.tracks.size;
    const nextSongs = songs > 20 ? `\n\n**${songs - 20}** piosenki` : `\n\nW playliście **${songs}** piosenka(i)`;

    if (queue.tracks.at(0)) {
    const embed = new EmbedBuilder()
    .setTitle('📰 Piosenki w kolejce')
    .setDescription(`🏆 [${queue.currentTrack.title}](${queue.currentTrack.url}) - ${queue.currentTrack.requestedBy}\n${tracks.slice(0, 20).join('\n')}${nextSongs}`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("Red")

    return message.reply({embeds: [embed]});
    };

    if (!queue.tracks.at(0)) {
        const _embed = new EmbedBuilder()
        .setTitle('📰 Piosenki w kolejce')
        .setDescription(`🏆 [${queue.currentTrack.title}](${queue.currentTrack.url}) - ${queue.currentTrack.requestedBy}\n\nW playliście **0** piosenek`)
        .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setColor("Red")
    
        return message.reply({embeds: [_embed]});
    };

};

exports.info = {
    name: "queue",
    aliases: ['q']
};
