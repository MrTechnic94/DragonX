'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'back',
    aliases: ['b', 'previous', 'prev'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue.history.previousTrack) return message.channel.send({ embeds: [messageEmbeds.track_back_error] });

        await queue.history.previous();
        return message.channel.send({ embeds: [messageEmbeds.track_back_success] });
    },
};