'use strict';

const { useQueue, QueueRepeatMode } = require('discord-player');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

module.exports = {
    name: 'forceskip',
    aliases: ['fs'],
    dj: true,
    run: async (_client, message) => {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying() || queue.repeatMode === QueueRepeatMode.OFF && !queue.tracks.at(0)) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        queue.node.skip();
        return message.channel.send({ embeds: [messageEmbeds.force_skip_success] });
    }
};