'use strict';

const { EmbedBuilder } = require('discord.js');
const { lyricsExtractor } = require('@discord-player/extractor');
const embeds = require('../../utils/embeds.js');

exports.run = async (client, message, args) => {
    const lyricsFinder = lyricsExtractor(process.env.LYRICSAPI);
    const query = args.join(' ');

    try {
        let x;
        if (query) {
            x = await lyricsFinder.search(query);
        } else {
            const queue = client.player.nodes.get(message.guild.id);
            if (!queue) return message.reply({embeds: [embeds.queue_error]});
            x = await lyricsFinder.search(queue.currentTrack.title);
        };

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`📜 ${x.artist.name} - ${x.title}`)
                    .setDescription(`${x.lyrics}`)
                    .setColor('Red')
            ]
        });
    } catch {
        return message.reply({embeds: [embeds.lyrics_error]});
    };
};

exports.info = {
    name: "lyrics",
    aliases: ["ly"]
};