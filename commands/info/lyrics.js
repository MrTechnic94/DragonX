'use strict';

const { EmbedBuilder } = require('discord.js');
const { Lyrics } = require('@discord-player/extractor');

exports.run = async (client, message, args) => {

    const queue = client.player.getQueue(message.guild.id);
    const lyricsClient = Lyrics.init("5BMkVnGjzNLfqs8ZVUzxqG81hq5TL3fLjy6oyJpPdOpRysonO2Vh_tSl8yL5zaHR");
    const argument = args.join(" ");

    if (argument) return await lyricsClient.search(argument).then((x) => {

    const embed = new EmbedBuilder()
        .setTitle(`🎵 ${x.title} - ${x.artist.name}`)
        .setDescription(`${x.lyrics}`)
        .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setColor("6b3deb")
    
        return message.reply({ embeds: [embed] });    

    }).catch((error) => {
        console.log(error)
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie udało mi się znaleźć tekstu do tego utworu!**`).setColor("Red")]});
    });

    if (!queue || !queue.playing) return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie gram żadnej piosenki!**`).setColor("Red")]});

    if (!argument) return await lyricsClient.search(queue.current.title).then((x) => {
        
    const _embed = new EmbedBuilder()
        .setTitle(`🎵 ${x.title} - ${x.artist.name}`)
        .setDescription(`${x.lyrics}`)
        .setFooter({text: `Użył/a: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setColor("6b3deb")
    
        return message.reply({ embeds: [_embed] });    

    }).catch((error) => {
        console.log(error)
        return message.reply({embeds: [new EmbedBuilder().setDescription(`❌ **Nie udało mi się znaleźć tekstu do tego utworu!**`).setColor("Red")]});
    });

};

exports.info = {
    name: "lyrics"
}