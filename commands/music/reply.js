'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue, useMainPlayer } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');

module.exports = {
    name: 'reply',
    dj: true,
    run: async (_client, message) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const player = useMainPlayer();

        const result = await player.search(queue.currentTrack.url, {
            requestedBy: message.member
        });

        if (!result.hasTracks()) return message.channel.send({ embeds: [messageEmbeds.track_error] });

        queue.insertTrack(result.tracks[0], 0);
        return message.channel.send({ embeds: [createEmbed({ description: `✅ **Dodano \`\`${result.tracks[0].title}\`\` do playlisty!**` })] });
    }
};