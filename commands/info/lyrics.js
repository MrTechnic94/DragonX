'use strict';

const { lyricsExtractor } = require('@discord-player/extractor');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'lyrics',
    owner: true,
    run: async (_client, message) => {
        const lyricsFinder = lyricsExtractor(/* 'optional genius API key' */);

        const lyrics = await lyricsFinder.search('alan walker faded').catch(() => null);

        const trimmedLyrics = lyrics.lyrics.substring(0, 1997);

        return message.channel.send({
            embeds: [
                createEmbed({
                    title: lyrics.title,
                    description: trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics
                })
            ]
        });
    }
};