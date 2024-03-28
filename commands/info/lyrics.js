'use strict';

const { useQueue } = require('discord-player');
const { lyricsExtractor } = require('@discord-player/extractor');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'lyrics',
    run: async (_client, message, args) => {
        const queue = useQueue(message.guild.id);
        const lyricsFinder = lyricsExtractor(process.env.GENIUS_LYRICS_API);
        const query = args.join(' ');

        if (!query && !queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.no_lyrics_args_error] });

        const lyrics = queue?.isPlaying() && !query ? await lyricsFinder.search(queue.currentTrack.title).catch(() => null) : await lyricsFinder.search(query).catch(() => null);

        if (!lyrics) return message.channel.send({ embeds: [messageEmbeds.no_found_lyrics_error] });

        const maxChars = 1997;
        let trimmedLyrics = lyrics.lyrics;
        let isFirstEmbed = true;
        const embeds = [];

        while (trimmedLyrics.length > maxChars) {
            const embed = createEmbed({
                title: isFirstEmbed ? `🎵 ${lyrics.artist.name} - ${lyrics.title}` : undefined,
                description: trimmedLyrics.substring(0, maxChars)
            });
            embeds.push(embed);
            trimmedLyrics = trimmedLyrics.substring(maxChars);
            isFirstEmbed = false;
        };

        if (trimmedLyrics.length > 0 || embeds.length === 0) {
            const embed = createEmbed({
                title: isFirstEmbed ? `🎵 ${lyrics.artist.name} - ${lyrics.title}` : undefined,
                description: trimmedLyrics
            });
            embeds.push(embed);
        };

        for (const embed of embeds) {
            message.channel.send({ embeds: [embed] });
        };
    }
};