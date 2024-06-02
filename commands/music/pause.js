'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'pause',
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        if (queue.node.isPaused()) return message.channel.send({ embeds: [messageEmbeds.paused_error] });

        if (queue.node.volume === 0) return message.channel.send({ embeds: [messageEmbeds.muted_player_error] });

        queue.node.pause();

        return message.channel.send({ embeds: [messageEmbeds.pause_success] });
    },
};