'use strict';

const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setColor("RED")]});

    if (!queue.tracks[0]) return message.reply({embeds: [new MessageEmbed().setDescription(`❌ **Nie ma żadnych piosenek w kolejce! Właśnie gram ostatnią!**`).setColor("RED")]});

    const tracks = queue.tracks.map((track, i) => `**${i + 1}.** ${track.title} - ${track.requestedBy}`);
    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `\n\n**${songs - 5}** piosenka(i)` : `\n\nW playliście **${songs}** piosenka(i)`;

    const embed = new MessageEmbed()
    .setTitle('📰 Piosenki w kolejce')
    .setDescription(`🏆 ${queue.current.title} - ${queue.current.requestedBy}\n${tracks.slice(0, 5).join('\n')}${nextSongs}`)
    .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setColor("RED")

    message.reply({ embeds: [embed] });

}

exports.info = {
    name: "queue"
}