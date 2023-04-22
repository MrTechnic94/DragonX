'use strict';

const { EmbedBuilder } = require('discord.js');
const { lyricsExtractor } = require('@discord-player/extractor');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    const queue = client.player.nodes.get(message.guild.id);
    const lyricsFinder = lyricsExtractor(process.env.LYRICSAPI);
    const query = args.join(' ');

    if (query) return await lyricsFinder.search(query).then(async x => {

    const embed = new EmbedBuilder()
        .setTitle(`🎵 ${x.artist.name} - ${x.title}`)
        .setDescription(`${x.lyrics}`)
        .setColor('Red')

        return message.reply({embeds: [embed]});    

    }).catch(() => {
        return message.reply({embeds: [embeds.lyrics_error]});
    });

    if (!queue?.isPlaying()) return message.reply({embeds: [embeds.queue_error]});

    if (!query) return await lyricsFinder.search(queue.currentTrack.title).then((x) => {

    const _embed = new EmbedBuilder()
        .setTitle(`🎵 ${x.artist.name} - ${x.title}`)
        .setDescription(`${x.lyrics}`)
        .setColor('Red')
    
        return message.reply({embeds: [_embed]});    

    }).catch(() => {
        return message.reply({embeds: [embeds.lyrics_error]});
    });
};

exports.info = {
    name: "lyrics",
    aliases: ['ly']
};