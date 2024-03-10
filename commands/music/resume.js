'use strict';

const { useQueue } = require('discord-player');
const { messageEmbeds } = require('../../utils/messageEmbeds.js');

exports.run = async (_client, message) => {
    if (message.member?.voice.channelId !== message.guild.members.me?.voice.channelId) return message.channel.send({ embeds: [messageEmbeds.voice_error] });

    const queue = useQueue(message.guild.id);

    if (!queue?.isPlaying()) return message.channel.send({ embeds: [messageEmbeds.queue_error] });

    if (!queue.node.isPaused()) return message.channel.send({ embeds: [messageEmbeds.resumed_error] });

    queue.node.resume();
    return message.channel.send({ embeds: [messageEmbeds.resume_success] });
};

exports.info = {
    name: "resume",
    aliases: ["r"],
    dj: true
};