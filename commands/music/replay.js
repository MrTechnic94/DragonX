'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { createEmbed } = require('../../utils/embedCreator.js');
const { useQueue, useMainPlayer } = require('discord-player');

module.exports = {
    name: 'replay',
    aliases: ['duplicate'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        if (message.guild.members.me?.voice.mute) return message.channel.send({ embeds: [messageEmbeds.muted_bot_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        const player = useMainPlayer();

        const result = await player.search(queue.currentTrack.url, {
            requestedBy: message.member
        });

        if (!result.hasTracks()) return message.channel.send({ embeds: [messageEmbeds.track_error] });

        queue.insertTrack(result.tracks[0], 0);
        return message.channel.send({ embeds: [createEmbed({ description: `✅ **Dodano \`${result.tracks[0].title}\` do playlisty**` })] });
    }
};