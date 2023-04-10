'use strict';

const { MessageEmbed } = require('discord.js');
const { Player } = require('discord-player');

exports.run = async (client, message) => {

    const queue = client.player.getQueue(message.guild.id);

        if(!queue || !queue.playing) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma żadnych piosenek w kolejce!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

        if (!queue.tracks[0]) return message.reply({embeds:[new MessageEmbed().setDescription(`❌ **Nie ma żadnych piosenek w kolejce! Właśnie gram ostatnią!**`).setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).setColor("RED")]});

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author} - ${track.requestedBy}`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `**${songs - 5}** innych piosenek` : `W playliście **${songs}** piosenek`;

        embed.setTitle('📰 Piosenki w kolejce')
        embed.setDescription(`🏆 **Aktualnie:** ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})

        message.channel.send({ embeds: [embed] });

}

exports.info = {
    name: "queue"
}