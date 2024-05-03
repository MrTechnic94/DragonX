'use strict';

const messageEmbeds = require('../../utils/messageEmbeds');
const { useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'forceskip',
    aliases: ['fs'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying() || queue.repeatMode === QueueRepeatMode.OFF && !queue.tracks.at(0)) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        queue.node.skip();
        return message.channel.send({ embeds: [messageEmbeds.skip_success] });
    }
};