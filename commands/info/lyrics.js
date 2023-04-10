'use strict';

const { EmbedBuilder } = require('discord.js');
const { lyricsExtractor } = require('@discord-player/extractor');

exports.run = async (client, message, args) => {

    const queue = client.player.nodes.get(message.guild.id);
    const lyricsFinder = lyricsExtractor("5BMkVnGjzNLfqs8ZVUzxqG81hq5TL3fLjy6oyJpPdOpRysonO2Vh_tSl8yL5zaHR");
    const argument = args.join(" ");

    if (argument) return await lyricsFinder.search(argument).then(async x => {

    const embed = new EmbedBuilder()
        .setTitle(`🎵 ${x.title} - ${x.artist}`)
        .setDescription(`${x.lyricsFinder}`)
        .setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setColor("6b3deb")

        return message.reply({embeds: [embed]});    

    }).catch((error) => {
        console.log(error)
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie udało mi się znaleźć tekstu do tego utworu!**`).setColor("Red")]});
    });

    if (!queue || !queue.isPlaying()) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (!argument) return await lyricsFinder.search(queue.currentTrack.title).then((x) => {

    const _embed = new EmbedBuilder()
        .setTitle(`🎵 ${x.title} - ${x.artist.name}`)
        .setDescription(`${x.lyrics}`)
        .setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setColor("6b3deb")
    
        return message.reply({embeds: [_embed]});    

    }).catch((error) => {
        console.log(error)
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie udało mi się znaleźć tekstu do tego utworu!**`).setColor("Red")]});
    });

};

exports.info = {
    name: "lyrics",
    aliases: ['ly']
};