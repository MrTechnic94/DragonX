'use strict';

const { useQueue } = require('discord-player');
const { createEmbed } = require('../../utils/embedCreator.js');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'reply',
    dj: true,
    run: async (_client, message) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const res = await player.search(queue.currentTrack.url, {
            requestedBy: message.member
        });

        queue.insertTrack(res.tracks[0], 0);
        return message.channel.send({ embeds: [createEmbed({ description: `✅ **${res.tracks[0].title}** dodano do playlisty!` })] });
    }
};