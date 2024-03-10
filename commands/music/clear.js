'use strict';

const { useQueue } = require('discord-player');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying() || !queue.tracks.at(0)) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    queue.tracks.clear();
    return message.channel.send({ embeds: [messageEmbeds.clear_success] });
};

exports.info = {
    name: "clear",
    aliases: ["c", "empty"],
    dj: true
};