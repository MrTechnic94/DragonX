'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { lyricsExtractor } = require('@discord-player/extractor');
const { useTimeline } = require('discord-player');

module.exports = {
    name: 'lyrics',
    cooldown: 2,
    async run(_client, message, args) {
        const timeline = useTimeline(message.guild.id);
        const lyricsFinder = lyricsExtractor(process.env.GENIUS_LYRICS_API);
        const query = args.join(' ').toLowerCase().replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq|remix\)/g, '');
        const currentTrackFormated = timeline?.track?.title.toLowerCase().replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq|remix\)/g, '');

        if (!query && !timeline?.track) return message.channel.send({ embeds: [messageEmbeds.no_lyrics_args_error] });

        const lyrics = timeline?.track && !query ? await lyricsFinder.search(currentTrackFormated).catch(() => null) : await lyricsFinder.search(query).catch(() => null);

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