'use strict';

const messageEmbeds = require('../../utils/messageEmbeds.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'clear',
    aliases: ['c', 'empty'],
    dj: true,
    cooldown: 2,
    async run(_client, message) {
        if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

        const queue = useQueue(message.guild.id);

        if (!queue?.isPlaying() || !queue.tracks.at(0)) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

        queue.tracks.clear();
        return message.channel.send({ embeds: [messageEmbeds.clear_success] });
    }
};