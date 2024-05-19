'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'shuffle',
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        if (queue.getSize() < 3) return message.channel.send({ embeds: [messageEmbeds.shuffle_error] });

        queue.tracks.shuffle();
        return message.channel.send({ embeds: [messageEmbeds.shuffle_success] });
    },
};